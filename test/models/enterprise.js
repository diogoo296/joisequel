const DEFAULT_PAYDAY = 20
const DEFAULT_PREPAID_PAYDAY = 10

module.exports = function (sequelize, DataTypes) {
  let Enterprise = sequelize.define('Enterprise', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      description: `Enterprise's unique identificaiton (PK)`
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'Enterprise`s name'
    },
    phone1: {
      type: DataTypes.STRING(20),
      description: `Enterprise's first phone`
    },
    phone2: {
      type: DataTypes.STRING(20),
      description: 'Enterprise`s second phone'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'Enterprise`s email'
    },
    address: {
      type: DataTypes.STRING,
      description: 'Enterprise`s address'
    },
    number: {
      type: DataTypes.STRING,
      description: 'Enterprise\'s address number'
    },
    city: {
      type: DataTypes.STRING,
      description: 'Enterprise\'s city'
    },
    state: {
      type: DataTypes.STRING,
      description: 'Enterprise\'s state'
    },
    zip_code: {
      type: DataTypes.STRING(10),
      description: `Enterprise's address zip code (CEP)`
    },
    complement: {
      type: DataTypes.STRING,
      description: `Enterprise's address additional information`
    },
    description: {
      type: DataTypes.TEXT,
      description: 'Enterprise`s description'
    },
    contact_name: {
      type: DataTypes.STRING,
      description: 'Enterprise`s contact name'
    },
    cnpj: {
      type: DataTypes.STRING(30),
      description: 'Cadastro Nacional de Pessoa Jurídica'
    },
    state_registration_no: {
      type: DataTypes.STRING(30),
      description: `Enterprise's state registration number`
    },
    webpage: {
      type: DataTypes.STRING,
      description: `Enterprise's webpage address`
    },
    picture_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'files',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      description: `Enterprise's picture (File FK)`
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      description: 'Record created at'
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      description: 'Record updated at'
    },
    deleted_at: {
      type: DataTypes.DATE,
      description: 'Record deleted at'
    },
    should_block: {
      type: DataTypes.BOOLEAN,
      description: 'Enterprise allow to block vehicle'
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'America/Sao_Paulo'
    },
    plan_category: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      description: 'Enterprise plan category used to assign discounts'
    },
    overdue: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      description: 'Enterprise is in overdue'
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'countries',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    },
    assistance_emergency_tel: {
      type: DataTypes.STRING(20),
      description: `Enterprise's emergency telephone for user assistance issues`
    },
    theft_emergency_tel: {
      type: DataTypes.STRING(20),
      description: `Enterprise's emergency phone for vehicle theft issues`
    }
  }, {
    tableName: 'enterprises',

    scopes: {
      compact: { attributes: ['id', 'name', 'timezone'] },
      email: { attributes: ['name', 'timezone'] }
    }
  })

  if (typeof Enterprise === 'undefined') return

  Enterprise.prototype.getMonthlyPaymentReport = function (db, month, billingType = 'postpaid', opts = {}) {
    month = month.clone().startOf('M')

    return this
      .getPayments(Object.assign(
        { where: { reference_month: month, billing_type: billingType } },
        {}
      ))
  }

  Enterprise.prototype.generateOrUpdateTicketInvoices = function (db, month, billingType = 'postpaid', opts = {}) {
    month = month.clone().startOf('M')

    return this
      .getTickets(Object.assign(
        { where: { billing_type: billingType }, paranoid: false },
        {}
      ))
      .mapSeries(ticket => billingType === 'postpaid'
        ? ticket.generateOrUpdateInvoices(db, month, opts)
        : ticket.generateOrUpdatePrepaidInvoices(db, month, opts)
      )
  }

  Enterprise.prototype.generateAllInvoicesByMonth = function (db, month, billingType = 'postpaid', opts = {}) {
    month = month.clone().startOf('M')

    return this
      .generateOrUpdateTicketInvoices(db, month, billingType, opts)
      .then(() => this.generateOrUpdateDiscountsByPlanByMonth(db, month, billingType, opts))
      .then(() => this.generateOrUpdateFeeInvoicesByMonth(db, month, billingType, opts))
  }

  Enterprise.prototype.paydayByMonth = function (db, month, billingType = 'postpaid', opts = {}) {
    month = month.clone().startOf('M')

    return this
      .getEnterprisePaydays(Object.assign({
        where: { start_month: month.format(), billing_type: billingType },
        limit: 1,
        order: [['start_month', 'DESC']]
      }, {}))
      .then(paydays => paydays.length === 1
        ? paydays[0].payday
        : (billingType === 'postpaid' ? DEFAULT_PAYDAY : DEFAULT_PREPAID_PAYDAY)
      )
  }

  return Enterprise
}
