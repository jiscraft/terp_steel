/**
 * Created by jiscr on 2022-02-05.
 */
Ext.define('Terp.view.tsoft.common.fileupload.attachfileinnergrid.Attachfileinnergrid', {
    extend: 'Terp.view.tsoft.componentbase.TsoftGrid',
    xtype: 'attachfileinnergrid',

    requires: [
        'Ext.grid.column.Boolean',
        'Ext.grid.column.Number',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Widget',
        'Terp.view.tsoft.common.fileupload.attachfileinnergrid.AttachfileinnergridController',
        'Terp.view.tsoft.common.fileupload.attachfileinnergrid.AttachfileinnergridModel',
        'Terp.view.tsoft.common.fileupload.fileUploadWindow.FileUploadWindow',
        'Terp.view.tsoft.componentbase.TsoftGrid'
    ],
    controller: 'attachfileinnergrid',
    viewModel: {
        type: 'attachfileinnergrid'
    },

    title : '첨부파일',
    iconCls: 'far fa-file',
    reference: 'attachfileinnergrid',
    border : true ,
    flex : 1,
    hiddenTools: [ 'plus','minus','edit', 'save', 'copy', 'export', 'import', 'cancel' ],
    bind :{
        store :'{attachfileinnergrid_store}'
    },
    tools: [
        {
            type: 'plus',
            tooltip: '파일추가',
            margin: '0 4 0 4',
            cls :'tsoft-component-tool',
            handler: function(){
                var thisOwnerCt = this.ownerCt;
                var windowParams = {
                    id_row_src: this.ownerCt.ownerCt.idRowSrc,
                    fg_sy210: this.ownerCt.ownerCt.fgSy210 ,
                    fg_sy210_ll: '',
                    enableModify: true,
                    windowTitle: '자료실 첨부파일',
                    upload_folder : 'Attachments'
                };
                var pop = Ext.create('Terp.view.tsoft.common.fileupload.fileUploadWindow.FileUploadWindow',{
                    openerController: this.up('[name=thisPage]').getController(),
                    popupParamView: this.ownerCt.ownerCt,
                    popupParamCallback: 'onFileUploadCallback',
                    popupParams: windowParams,
                    autoShow: true
                });

                pop.on('close', function() {
                    thisOwnerCt.ownerCt.getController().refresh(windowParams.fg_sy210 , windowParams.id_row_src);
                });
            }
        },
        {
            type: 'edit',
            tooltip: '수정',
            margin: '0 4 0 4',
            cls :'tsoft-component-tool'
        },
        {
            type: 'minus',
            tooltip: '삭제',
            margin: '0 4 0 4',
            cls :'tsoft-component-tool',
            handler: function(){
                var thisOwnerCt = this.ownerCt;
                var windowParams = {
                    id_row_src: this.ownerCt.ownerCt.idRowSrc,
                    fg_sy210: this.ownerCt.ownerCt.fgSy210 ,
                    fg_sy210_ll: '',
                    enableModify: true,
                    windowTitle: '자료실 첨부파일',
                    upload_folder : 'Attachments'
                };
                var pop = Ext.create('Terp.view.tsoft.common.fileupload.fileUploadWindow.FileUploadWindow',{
                    openerController: this.up('[name=thisPage]').getController(),
                    popupParamView: this.ownerCt.ownerCt,
                    popupParamCallback: 'onFileUploadCallback',
                    popupParams: windowParams,
                    autoShow: true
                });

                pop.on('close', function() {
                    thisOwnerCt.ownerCt.getController().refresh(windowParams.fg_sy210 , windowParams.id_row_src);
                });
            }

        },
        {
            type: 'save',
            tooltip: '저장',
            margin: '0 4 0 4',
            cls :'tsoft-component-tool'
        },
        {
            type: 'copy',
            tooltip: '복사',
            margin: '0 4 0 4',
            cls :'tsoft-component-tool'
        },
        {
            type: 'export',
            tooltip: '엑셀 파일로 내보내기',
            margin: '0 4 0 4',
            cls :'tsoft-component-tool'
        },
        {
            type: 'import',
            tooltip: '엑셀 데이터 가져오기',
            margin: '0 4 0 4',
            cls :'tsoft-component-tool'
        },
        {
            type: 'cancel',
            tooltip: '취소',
            margin: '0 4 0 4',
            cls :'tsoft-component-tool'
        }
    ],

    plugins: [
        {	// cell 에디팅 플러그인
            ptype: 'cellediting',
            pluginId: 'cellplugin',
            clicksToEdit: 1,
            disabled : true ,
            listeners :{
            }
        },
        {	// cell merge 플러그인
            pluginId: 'cellMerge',
            ptype: 'tsoftgridcellmerge'
        },
        {
            "ptype" : 'gridfilters'
        }
    ],


    columns:[
        {
            text: '순번',
            dataIndex: 'sq',
            xtype: 'rownumberer',
            align: 'center',
            width: 60,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                var nv = rowIndex + 1;
                return nv;
            }
        },
        {
            text: '파일명',
            dataIndex: 'dc_src_name',
            width : 350,
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                var grid = view.grid;
                grid.enableDownload = true;
                if (grid.enableDownload) {
                    var uri = '/ServerPage/common/download.jsp';
                    var path = record.get('dc_save_path');
                    var originalFile = record.get('originalFile');
                    // if (path == 'files/OLD/DOCU_REF'){
                    // console.log(path.substr(0,10));
                    if ( originalFile !='' ){
                        var fn = Ext.String.format('{0}', record.get('originalFile'));
                    } else if (path.substr(0,10) == 'files/OLD/') {
                        var fn = Ext.String.format('{0}', record.get('dc_src_name'));
                    } else{
                        var fn = Ext.String.format('{0}.{1}', record.get('no_af'), record.get('dc_src_name').split('.').pop());
                        // 20220222 var fn = Ext.String.format('{0}_{1}.{2}', record.get('no_af'), record.get('id_row_src'), record.get('dc_src_name').split('.').pop());
                    }
                    // var fn = Ext.String.format('{0}_{1}.{2}', record.get('no_af'), record.get('id_row_src'), record.get('dc_src_name').split('.').pop());
                    var dfn = record.get('dc_src_name');
                    value = Ext.String.format('<a href="javascript:downloadTerpFileFromUrl(\'{0}/{1}\', \'{3}\');">{3}</a>', path, fn, dfn.split('\'').join('\\\''), value);
                    //value = Ext.String.format('<a href="javascript:downloadTerpFile(\'{0}\',\'{1}\',\'{2}\');">{3}</a>', path, fn, dfn.split('\'').join('\\\''), value);
                }
                return value;
            }
        },
        {
            xtype: 'numbercolumn',
            text: '크기',
            dataIndex: 'dc_src_size',
            format: '0,000 바이트',
            width : 150,
            align: 'right'
        },
        {
            xtype: 'booleancolumn',
            text: '결과',
            hidden: true,
            dataIndex: 'completed'
        },
        {
            xtype: 'widgetcolumn',
            text: '진행율',
            dataIndex: 'progress',
            width    : 120,
            hidden: true,
            widget: {
                xtype: 'progressbarwidget',
                textTpl: [
                    '{percent:number("0")}%'
                ]
            }
        }
    ],

});