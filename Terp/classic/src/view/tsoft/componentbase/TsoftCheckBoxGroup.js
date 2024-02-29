/**
 * Created by user on 2020-10-21.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftCheckBoxGroup', {
    extend: 'Ext.form.CheckboxGroup',
    xtype: 'tsoftcheckboxgroup',
    labelSeparator: '',
    labelAlign: 'right',
    getValuetf: function() {
        var values = {},
            boxes = this.getBoxes(),
            b,
            bLen = boxes.length,
            box, name, inputValue, bucket;

        for (b = 0; b < bLen; b++) {
            box = boxes[b];
            name = box.getName();
            inputValue = box.inputValue;
            // if (box.getValue()) {
                if (values.hasOwnProperty(name)) {
                    bucket = values[name];

                    if (!Ext.isArray(bucket)) {
                        bucket = values[name] = [bucket];
                    }

                    bucket.push(box.getValue());
                }
                else {
                    values[name] = box.getValue();
                }
            // }
        }

        return values;
    },

    getValue01: function() {
        var values = {},
            boxes = this.getBoxes(),
            b,
            bLen = boxes.length,
            box, name, bucket;

        for (b = 0; b < bLen; b++) {
            box = boxes[b];
            name = box.getName();


            // if (box.getValue()) {
            if (values.hasOwnProperty(name)) {
                bucket = values[name];

                if (!Ext.isArray(bucket)) {
                    bucket = values[name] = [bucket];
                }
                if(box.getValue())
                {
                    bucket.push('1');
                }
                else
                {
                    bucket.push('0');
                }
            }
            else {
                if(box.getValue())
                {
                    values[name] = '1';
                }
                else
                {
                    values[name] = '0';

                }
            }
            // }
        }

        return values;
    },

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});