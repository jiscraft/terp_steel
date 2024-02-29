/**
 * Created by jiscraft on 2016-01-14.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftTextField', {
    extend: 'Ext.form.field.Text',
    xtype: 'tsofttextfield',


    requires: [
        'Ext.util.Format'
    ],

    config : {
        keyField: false //값을 true로 주면 값을 수정할 수 없슴
    },

    selectOnFocus: true,
    labelSeparator : '',
    labelWidth: 60 ,
    width : 200 ,
    labelAlign :'right',

    initComponent: function() {
        var me = this;

        if(this.tsoftLength != null && this.tsoftLength != '' && this.tsoftLength != undefined){
            //console.log(this.name, this.fieldLabel, this.labelWidth, this.exLength);
            if(this.fieldLabel == null){
                this.labelWidth = 0;
            }
            this.setWidth(this.tsoftLength * 10 + 10 + this.labelWidth);
        }

        if(!this.allowBlank){
            //#FFFEFA
            // this.setFieldStyle('background-color: #faf4de;');
            this.setFieldLabel('<span style="color:red">*</span>'+this.getFieldLabel());
        }

        me.callParent(arguments);
    },

    listeners:{
        focus:function(){
            //console.log(this.getValue());
            if(this.tsoftNumberComma == true){
                //console.log(this.getValue);
                var val = this.getValue().replace(/,/g,'');
                this.setValue(val);
            }
            //if (!Ext.isEmpty(this.ownerCt.context)) {
            //    this.setRawValue(this.ownerCt.context.record.get(this.ownerCt.context.field));
            //}
            this.selectText();
        },
        blur:function(d){
            if(this.tsoftNumberComma == true){
                var val = this.getValue().replace('/,/g','');
                this.setValue(Ext.util.Format.number(val, '0,000'));
            }
            else if(this.tsoftZeroPadding == true){
                if(this.maxLength> 20){
                    Ext.Msg.alert('오류', 'tbZeroPadding은 maxLength를 20자리까지만 지원합니다.');
                    return;
                }
                this.setValue( ('00000000000000000000' + this.getValue()).substring(20-this.maxLength + this.getValue().length));
            }
        },
        afterRender : function(){
            if(this.textAlign == 'center'){
                this.inputEl.setStyle('text-align', 'center')
            }
            else if(this.textAlign == 'right'){
                this.inputEl.setStyle('text-align', 'right')
            }
            else if(this.textAlign == '' || this.textAlign == 'left' ){
                this.inputEl.setStyle('text-align', 'left')
            }
        },
        specialkey: function(field, e) {
            Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(field, e);
        }
    }

});