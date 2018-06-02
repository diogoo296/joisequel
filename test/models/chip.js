module.exports = function (sequelize, DataTypes) {
  var Chip = sequelize.define('Chip', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      description: 'Chip id'
    },
    enterprise_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'enterprises',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      description: 'Enterprise id reference'
    },
    chip_serial: {
      type: DataTypes.STRING(20),
      description: 'Chip serial number'
    },
    mobile_number: {
      type: DataTypes.STRING(20),
      description: 'Chip phone number'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      description: 'Record was created at this date'
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      description: 'Record was updated at this date'
    },
    deleted_at: {
      type: DataTypes.DATE,
      description: 'Record was deleted at this date'
    },
    carrier: {
      type: DataTypes.STRING,
      description: 'Chip carrier enterprise'
    },
    apn: {
      type: DataTypes.STRING,
      description: 'APN domain name'
    },
    apn_username: {
      type: DataTypes.STRING,
      description: 'APN login username'
    },
    apn_password: {
      type: DataTypes.STRING,
      description: 'APN login password'
    },
    chip_cost: {
      type: DataTypes.INTEGER,
      description: 'Cost value of the chip'
    },
    chip_cost_currency_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'currencies',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      description: 'Currency of the cost of the chip'
    },
    plan: {
      type: DataTypes.STRING,
      description: 'Type of usage plan that was purchased'
    },
    plan_cost: {
      type: DataTypes.INTEGER,
      description: 'Monthly cost value of the plan'
    },
    plan_cost_currency_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'currencies',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      description: 'Currency of the cost of the plan'
    },
    sms_total_amount: {
      type: DataTypes.INTEGER,
      description: 'Total amount of SMS allowed by the plan'
    },
    byte_total_amount: {
      type: DataTypes.INTEGER,
      description: 'Total amount of bytes allowed by the plan'
    },
    byte_current_usage: {
      type: DataTypes.INTEGER,
      description: 'Current byte usage of the chip'
    },
    lot: {
      type: DataTypes.STRING(64),
      description: 'Import batch identification'
    },
    purchased_date: {
      type: DataTypes.DATE,
      description: 'Date of purchase of the chip'
    },
    received_date: {
      type: DataTypes.DATE,
      description: 'Date when the chip was received in the office'
    },
    current_state: {
      type: DataTypes.STRING,
      description: 'Current state of the chip'
    }
  }, {
    tableName: 'chips'
  })
  return Chip
}
