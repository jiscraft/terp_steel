
/**
 * Created by jiscraft on 2016-11-05.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftWkJcCostGridField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftwkjccostgridfield',

    requires: [
        'Terp.view.tsoft.help.wkjccosthelp.TsoftWkJcCostHelp'
    ],

    config :{
        displayValue: '',
        realValue: ''
    },

    width : 200 ,
    labelWidth: 60 ,
    labelSeparator: '' ,
    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function () {
                //console.log('handler');
                // var pop = Ext.create('Terp.view.tsoft.help.wkjccosthelp.TsoftWkJcCostHelp');
                // pop.show();
                // pop.getController().init(this);
                console.log(this);
                var me = this;
                var pop = Ext.create('Terp.view.tsoft.help.wkjccosthelp.TsoftWkJcCostHelp',{
                    popupParamView : me ,   //부르는넘의 뷰
                    popupParamCallback : 'callbackPopup' ,  // 끝나고 돌아와서 처리할 펑션이름
                    popupParams : me   //처리할파라미터

                });
                pop.show();
            }
        },
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function () {
                this.setValue('');
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, '');
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, '');
                this.ownerCt.grid.selection.set(this.ownerCt.column.fgsy080Index, '');
                this.ownerCt.grid.selection.set(this.ownerCt.column.fgsy080llIndex, '');
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmsy080Index, '');
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmsy080llIndex, '');
                this.ownerCt.grid.selection.set(this.ownerCt.column.atremIndex, 0);
                this.fireEvent('setcallbackvalue', this, null);
            }
        }
    },

    listeners : {

    },


    callbackPopup : function(params) {
        console.log(params);
        //console.log(this.ownerCt.ownerCmp.ownerCt.items.items[2].down('[name=cd_p]').value , params.cd_p);
        //this.ownerCt.ownerCmp.ownerCt.items.items[2].down('[name=cd_p]').value

        //20180612  금액이 0이라도 선택할 수 있도록 처리
        // if ( params.at_rem <= 0   ) {
        //     Terp.app.getController('TerpCommon').toastMessage('가능금액이 0 보다 작으면 선택할 수 없습니다', 't');
        //     return;
        // }

        if (this.ownerCt.form) {
            if (this.ownerCt.reference == 'wk16j1001_form1') {
                if (params.fg_sy080 !== '0001') {
                    Terp.app.getController('TerpCommon').msgBox.alert('오류', '지불항목이 노무비가 아닙니다. 다시 선택해 주세요.');
                    return false;
                } else {
                    if (params.fg_sy080_ll !== '0050' && params.fg_sy080_ll !== '0090' && params.fg_sy080_ll !== '0130') {
                        Terp.app.getController('TerpCommon').msgBox.alert('오류', '상세항목이 일용이 아닙니다. 다시 선택해 주세요.');
                        return false;
                    }
                }

            }

            this.setValue(params.cd_site);
            this.setDisplayValue(params.nm_site);
            this.setRealValue(params.cd_site);
            this.setRawValue(params.nm_site);
            this.ownerCt.getForm().findField('fg_sy080').setValue(params.fg_sy080);
            this.ownerCt.getForm().findField('fg_sy080_ll').setValue(params.fg_sy080_ll);
            this.ownerCt.getForm().findField('nm_sy080').setValue(params.nm_sy080);
            this.ownerCt.getForm().findField('nm_sy080_ll').setValue(params.nm_sy080_ll);
            this.ownerCt.getForm().findField('at_budget_Rem').setValue(params.at_budget_Rem);
            // if (this.ownerCt.getForm().findField('at_budget_Rem')) {
            //     this.ownerCt.getForm().findField('at_budget_Rem').setValue(params.at_budget_Rem);
            // }
        }
        else {
            if (this.ownerCt.ownerCmp.reference == 'cm17g3101_grid1'){
                // console.log('공무실행금액조정입니다');
            }
            else{
                // if ( params.cd_p  != ''  ){
                //     if ( params.cd_p != this.ownerCt.ownerCmp.ownerCt.items.items[2].down('[name=cd_p]').value ) {
                //         Terp.app.getController('TerpCommon').toastMessage('선택한 실행의 협력업체와 지출할 협력업체 정보가 다릅니다.', 't');
                //         return;
                //     }
                // }
                if (this.ownerCt.ownerCmp.reference == 'hr16l2701_grid1') {
                    if (params.fg_sy080 !== '0001') {
                        Terp.app.getController('TerpCommon').msgBox.alert('오류', '지불항목이 노무비가 아닙니다. 다시 선택해 주세요.');
                        return false;
                    } else {
                        if (params.fg_sy080_ll !== '0030' && params.fg_sy080_ll !== '0070' && params.fg_sy080_ll !== '0110') {
                            Terp.app.getController('TerpCommon').msgBox.alert('오류', '상세항목이 CIP가 아닙니다. 다시 선택해 주세요.');
                            return false;
                        }
                    }
                }
            }
            this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.cd_site);
            this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, params.nm_site);
            this.ownerCt.grid.selection.set(this.ownerCt.column.fgsy080Index, params.fg_sy080);
            this.ownerCt.grid.selection.set(this.ownerCt.column.fgsy080llIndex, params.fg_sy080_ll);
            this.ownerCt.grid.selection.set(this.ownerCt.column.nmsy080Index, params.nm_sy080);
            this.ownerCt.grid.selection.set(this.ownerCt.column.nmsy080llIndex, params.nm_sy080_ll);
            this.ownerCt.grid.selection.set(this.ownerCt.column.atremIndex, params.at_budget_Rem);
        }
        this.fireEvent('setcallbackvalue', this, params);
    }



});

/*
 nmIndex: 'nm_costcenter',
 fgsy080Index : 'fg_sy080',
 fgsy080llIndex :'fg_sy080_ll',
 nmsy080Index : 'nm_sy080',
 nmsy080llIndex :'nm_sy080_ll',
 atremIndex :'at_rem',
* */