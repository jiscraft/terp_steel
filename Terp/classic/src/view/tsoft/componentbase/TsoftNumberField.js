/**
 * Created by jiscraft on 2016-01-14.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftNumberField', {
    extend: 'Ext.form.field.Number',
    xtype: 'tsoftnumberfield',

    currencySymbol: null,
    useThousandSeparator: true,
    thousandSeparator: ',',
    alwaysDisplayDecimals: false,
    fieldStyle: 'text-align: right;',
    hideTrigger: true,
    keyNavEnabled: false,
    mouseWheelEnabled: false,
    enableKeyEvents: true,
    selectOnFocus: true,
    labelSeparator : '',
    allowDecimals : true ,
    align : 'right',
    format: '0,000.00',
    labelAlign :'right',
    initComponent: function() {
        if (this.useThousandSeparator && this.decimalSeparator == ',' && this.thousandSeparator == ',')
            this.thousandSeparator = '.';
        else
        if (this.allowDecimals && this.thousandSeparator == '.' && this.decimalSeparator == '.')
            this.decimalSeparator = ',';

        // if(!this.allowBlank){
        //     //#FFFEFA
        //     // this.setFieldStyle('border-color: #faf4de;');
        //     this.setFieldLabel('<span style="color:red">*</span>'+this.getFieldLabel());
        // }
        this.callParent(arguments);
    },

    setValue: function(value){
        Terp.view.tsoft.componentbase.TsoftNumberField.superclass.setValue.call(this, value != null ? value.toString().replace('.', this.decimalSeparator) : value);

        this.setRawValue(this.getFormattedValue(this.getValue()));
    },

    getFormattedValue: function(value){
        if (Ext.isEmpty(value) || !this.hasFormat())
            return value;
        else
        {
            var neg = null;

            value = (neg = value < 0) ? value * -1 : value;
            value = this.allowDecimals && this.alwaysDisplayDecimals ? value.toFixed(this.decimalPrecision) : value;

            if (this.useThousandSeparator)
            {
                if (this.useThousandSeparator && Ext.isEmpty(this.thousandSeparator))
                    throw ('NumberFormatException: invalid thousandSeparator, property must has a valid character.');

                if (this.thousandSeparator == this.decimalSeparator)
                    throw ('NumberFormatException: invalid thousandSeparator, thousand separator must be different from decimalSeparator.');

                value = value.toString();

                var ps = value.split('.');
                ps[1] = ps[1] ? ps[1] : null;

                var whole = ps[0];

                var r = /(\d+)(\d{3})/;

                var ts = this.thousandSeparator;

                while (r.test(whole))
                    whole = whole.replace(r, '$1' + ts + '$2');

                value = whole + (ps[1] ? this.decimalSeparator + ps[1] : '');
            }

            return Ext.String.format('{0}{1}{2}', (neg ? '-' : ''), (Ext.isEmpty(this.currencySymbol) ? '' : this.currencySymbol + ' '), value);
        }
    },
    /**
     * overrides parseValue to remove the format applied by this class
     */
    parseValue: function(value){
        //Replace the currency symbol and thousand separator
        return Terp.view.tsoft.componentbase.TsoftNumberField.superclass.parseValue.call(this, this.removeFormat(value));
    },
    /**
     * Remove only the format added by this class to let the superclass validate with it's rules.
     * @param {Object} value
     */
    removeFormat: function(value){
        if (Ext.isEmpty(value) || !this.hasFormat())
            return value;
        else
        {
            value = value.toString().replace(this.currencySymbol + ' ', '');

            value = this.useThousandSeparator ? value.replace(new RegExp('[' + this.thousandSeparator + ']', 'g'), '') : value;

            return value;
        }
    },
    /**
     * Remove the format before validating the the value.
     * @param {Number} value
     */
    /*    getErrors: function(value){
     return Terp.tsoft.componentbase.TbNumberField.superclass.getErrors.call(this, this.removeFormat(value));
     },*/
    hasFormat: function(){
        return this.decimalSeparator != '.' || (this.useThousandSeparator == true && this.getRawValue() != null) || !Ext.isEmpty(this.currencySymbol) || this.alwaysDisplayDecimals;
    },
    /**
     * Display the numeric value with the fixed decimal precision and without the format using the setRawValue, don't need to do a setValue because we don't want a double
     * formatting and process of the value because beforeBlur perform a getRawValue and then a setValue.
     */
    onFocus: function(){
        this.setRawValue(this.removeFormat(this.getRawValue()));
        if (!Ext.isEmpty(this.ownerCt.context)) {
            this.setRawValue(this.removeFormat(this.ownerCt.context.record.get(this.ownerCt.context.field)));
        }
        this.selectText();
        this.callParent(arguments);
    },
    processRawValue: function(value) {
        return this.removeFormat(value);
    },

    listeners: {
        specialkey: function(field, e) {
            Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(field, e);
        }
    }

});