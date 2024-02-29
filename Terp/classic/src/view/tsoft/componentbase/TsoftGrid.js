/**
 * Created by jiscraft on 2016-02-03.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.tsoftgrid',
	requires: [
		'Ext.grid.filters.Filters',
		'Ext.grid.plugin.CellEditing',
		'Terp.view.tsoft.componentux.plugin.TsoftGridCellMergePlugin'
	],

	cls: 'tsoft-component-grid',
	multiColumnSort: true,
	columnLines: true,
	//rowLines: false,
	selectAndScrollIndex : 0 ,
	config :{
		gridRowIdx :undefined ,
		gridSelection :'',
		gridDataIdx:''

	},
	viewConfig : {
		enableTextSelection: true
	},
	enableKeyEvents: true,
    selModel: 'rowmodel',
    border : true ,
	/*빈드시 그리드 레퍼런스가 지정되어 있어야 합니다....리퍼런스이름을 참조해서 펑션을 실행합니다..*/
	header : true ,
	hiddenTools: [],
	stateful: true,
	plugins: 'gridfilters',
	tools: [
		{
			type: 'plus',
			tooltip: '추가',
			margin: '0 4 0 4',
			cls :'tsoft-component-tool',

			handler: function(){

				if (this.up('tsoftgrid').getGridRowIdx() < 0 || this.up('tsoftgrid').getGridRowIdx() == undefined){
					this.up('tsoftgrid').setGridRowIdx(0);
				}

				var topThis = Terp.app.getController('TerpCommon').getTopOwnerCt(this);

				var c = topThis.getController();
				this.up('tsoftgrid').getPlugin('cellplugin').completeEdit();

				var thisRefFunction = 'onGridInsert_' + this.up('tsoftgrid').reference  ;
				if (c['__proto__'][thisRefFunction] == undefined){
					return;
				}
				c[thisRefFunction](this.up('tsoftgrid').getGridSelection() , this.up('tsoftgrid').getGridRowIdx()  );
			}
		},
		{
			type: 'edit',
			tooltip: '수정',
			margin: '0 4 0 4',
			cls :'tsoft-component-tool',
			handler: function(){
				var topThis = Terp.app.getController('TerpCommon').getTopOwnerCt(this);
				var c = topThis.getController();

				this.up('tsoftgrid').getPlugin('cellplugin').completeEdit();
				this.up('tsoftgrid').setReadOnly(false);

				var thisRefFunction = 'onGridModify_' + this.up('tsoftgrid').reference  ;
				if (c['__proto__'][thisRefFunction] === undefined){

				}else {
					c[thisRefFunction]();
				}
			}
		},
		{
			type: 'minus',
			tooltip: '삭제',
			margin: '0 4 0 4',
			cls :'tsoft-component-tool',
			handler : function(){
				var me = this ;
				Ext.MessageBox.confirm('확인', '선택한 정보를 삭제하시겠습니까?', function(btn){
					if (btn == 'yes') {
						var topThis = Terp.app.getController('TerpCommon').getTopOwnerCt(me);

						var c = topThis.getController();

						var thisRefFunction = 'onGridDelete_' + me.up('tsoftgrid').reference  ;
						if (c['__proto__'][thisRefFunction] == undefined){
							//Terp.app.getController('TerpCommon').toastMessage('실행할 함수가 없습니다' , 'b');
							return;
						}

						//console.log('삭제시 선택된 행은:', me.up('tsoftgrid').getGridRowIdx());
						if (me.up('tsoftgrid').getGridRowIdx() == undefined || me.up('tsoftgrid').getGridRowIdx() < 0  ){
							Terp.app.getController('TerpCommon').toastMessage('행을 선택한뒤 삭제 바랍니다' , 'b');
							return;
						}
						me.up('tsoftgrid').getPlugin('cellplugin').completeEdit();
						// me.up('tsoftgrid').setReadOnly(true);
						c[thisRefFunction](me.up('tsoftgrid').getGridSelection() , me.up('tsoftgrid').getGridRowIdx()  );
					}
				});
			}
		},
		{
			type: 'save',
			tooltip: '저장',
			margin: '0 4 0 4',
			cls :'tsoft-component-tool',
			handler: function(){
				var topThis = Terp.app.getController('TerpCommon').getTopOwnerCt(this);
				var c = topThis.getController();
				this.up('tsoftgrid').getPlugin('cellplugin').completeEdit();
				var thisRefFunction = 'onGridSave_' + this.up('tsoftgrid').reference  ;
				if (c['__proto__'][thisRefFunction] == undefined){
					return;
				}
				c[thisRefFunction]();
				this.up('tsoftgrid').setReadOnly(true);
			}
		},
		{
			type: 'copy',
			tooltip: '복사',
			margin: '0 4 0 4',
			cls :'tsoft-component-tool',
			handler: function(){
				var topThis = Terp.app.getController('TerpCommon').getTopOwnerCt(this);
				var c = topThis.getController();
				this.up('tsoftgrid').getPlugin('cellplugin').completeEdit();

				if (this.up('tsoftgrid').getGridRowIdx() == undefined  || this.up('tsoftgrid').getGridRowIdx() < 0  ){
					Terp.app.getController('TerpCommon').toastMessage('행을 선택한뒤 복사할 수 있습니다' , 't');
					return;
				}

				var thisRefFunction = 'onGridCopy_' + this.up('tsoftgrid').reference  ;
				if (c['__proto__'][thisRefFunction] == undefined){
					return;
				}
				c[thisRefFunction](this.up('tsoftgrid').getGridSelection() , this.up('tsoftgrid').getGridRowIdx()  );
				// c[thisRefFunction](this.up('tsoftgrid').getGridSelection() , this.up('tsoftgrid').getGridRowIdx());
			}
		},
		{
			type: 'export',
			tooltip: '엑셀 파일로 내보내기',
			margin: '0 4 0 4',
			cls :'tsoft-component-tool',
			handler: function() {
				if (this.up('tsoftgrid').excelExportOption == 'option'){
					var topThis = Terp.app.getController('TerpCommon').getTopOwnerCt(this);
					var c = topThis.getController();
					this.up('tsoftgrid').getPlugin('cellplugin').completeEdit();
					var thisRefFunction = 'onGridPrint_' + this.up('tsoftgrid').reference  ;
					if (c['__proto__'][thisRefFunction] == undefined){
						return;
					}
					c[thisRefFunction]();
				}else{
					this.up('tsoftgrid').onExcelQuickExport();
				}

			}
		},
		{
			type: 'import',
			tooltip: '엑셀 데이터 가져오기',
			margin: '0 4 0 4',
			cls :'tsoft-component-tool',
			handler: function(){
				// if (this.up('tsoftgrid').getGridRowIdx() < 0 || this.up('tsoftgrid').getGridRowIdx() == undefined){
				// 	this.up('tsoftgrid').setGridRowIdx(0);
				// }

				var topThis = Terp.app.getController('TerpCommon').getTopOwnerCt(this);

				var c = topThis.getController();
				this.up('tsoftgrid').getPlugin('cellplugin').completeEdit();

				var thisRefFunction = 'onGridIImport_' + this.up('tsoftgrid').reference  ;
				if (c['__proto__'][thisRefFunction] == undefined){
					return;
				}
				c[thisRefFunction](this.up('tsoftgrid').getGridSelection() , this.up('tsoftgrid').getGridRowIdx()  );
			}
		},
		{
			type: 'cancel',
			tooltip: '취소',
			margin: '0 4 0 4',
			cls :'tsoft-component-tool',
			handler: function(){
				var topThis = Terp.app.getController('TerpCommon').getTopOwnerCt(this);
				var c = topThis.getController();
				this.up('tsoftgrid').getPlugin('cellplugin').completeEdit();
				var thisRefFunction = 'onGridCancel_' + this.up('tsoftgrid').reference  ;
				if (c['__proto__'][thisRefFunction] == undefined){
					return;
				}
				c[thisRefFunction]();
			}
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

	listeners: {
		afterrender: function (grid) {
			// console.log(grid, grid.tools, grid.tools.edit, grid.tools['edit']);
			if (!Ext.isEmpty(grid.hiddenTools) && this.getHeader()) {

				Ext.Array.each(grid.tools, function (tool) {
					if (tool.cls === 'tsoft-component-tool') tool.show();
				});

				if ((typeof (grid.hiddenTools) === 'string') && (grid.hiddenTools.toLowerCase() === 'all')) {
					Ext.Array.each(grid.tools, function (tool) {
						if (tool.cls === 'tsoft-component-tool') tool.hide();
					});
				} else {
					Ext.Array.each(grid.hiddenTools, function (type) {
						if (!Ext.isEmpty(grid.tools[type]))
							grid.tools[type].hide();
					});
				}
			}
		},

		rowclick: function (obj, record, tr, rowIndex, e, eOpts) {
			//console.log('click;' ,record , rowIndex);
			this.setGridRowIdx(rowIndex);
			this.setGridSelection(record);

			//console.log('지금선택한항은' , this.getGridRowIdx());
		},

		select: function (obj, record, index, eOpts) {
			// console.log('select;' ,record , index);
			this.setGridRowIdx(index);
			this.setGridSelection(record);

		},

		cellclick: function (me, td, cellIndex, record, tr, rowIndex, e, eOpts) {
			this.setGridDataIdx(me.headerCt.getGridColumns()[cellIndex].dataIndex);
			// console.log(me.headerCt.getGridColumns()[cellIndex].dataIndex);
		},

		cellcontextmenu: function (me, td, cellIndex, record, tr, rowIndex, e, eOpts) {
			this.setGridDataIdx(me.headerCt.getGridColumns()[cellIndex].dataIndex);
			// console.log(this.getGridDataIdx());
		},

		onKeyDown : function(obj , record, item, index, e, eOpts){
			var k = e.getKey();
			if(k == '13') {
				console.log('enter')
			}
		}

	},


    setReadOnly : function(truefalseArg){
        if (truefalseArg){
            this.getPlugins()[0].disable();
        }else{
            this.getPlugins()[0].enable();
        }
    },

    makeSendData : function(actionData , dataGather , encodeType ){
        //actionData  데이타처리방법  값을 안주면 modyfy s  insert s   delete d
        //dataGather  'all' 그리드의 모든데이타를 처리   '' 변경이된 데이타만 처리
		//encodeType : 리턴을 인코드한채로 받는다 true   jaon형태로 받는다 false
		//console.log(encodeType);
		if ( encodeType != false ){
			encodeType = true;
		}

        if ( actionData == null  ){
            actionData = '';
        }

        if ( dataGather == null || dataGather == ''){
            dataGather = '';
        }

        var commonFn  = Terp.app.getController('TerpCommon');

        var loginCdc = commonFn.getUserInfo().cd_c;
        var loginIduser = commonFn.getUserInfo().id_user;
        var loginCde = commonFn.getUserInfo().cd_e;

        var store = this.getStore();
        var allData = store.getData() ;
        //console.log(allData);
        var modifydata = store.getModifiedRecords() ;
        var removedata = store.getRemovedRecords() ;
		//console.log(modifydata);
        //console.log(removedata);
        var sendDataJson = [];

        if (dataGather == '' ) {
			for (var i = 0; i < removedata.length; i++) {
				removedata[i].data.actiondata = actionData == '' ? 'd' : actionData;
				removedata[i].data.loginIduser = loginIduser;
				removedata[i].data.loginCdc = loginCdc;
				removedata[i].data.loginCde = loginCde;
				sendDataJson.push(
					removedata[i].data
				);
			}
            for (var i = 0; i < modifydata.length; i++) {
                modifydata[i].data.actiondata = actionData == '' ? 's' : actionData;
                modifydata[i].data.loginIduser = loginIduser;
                modifydata[i].data.loginCdc = loginCdc;
                modifydata[i].data.loginCde = loginCde;
                sendDataJson.push(
                    modifydata[i].data
                );
            }
        }   else{
            for (var i = 0; i < allData.length; i++) {
                allData.items[i].data.actiondata = actionData == '' ? 's' : actionData;
                allData.items[i].data.loginIduser = loginIduser;
                allData.items[i].data.loginCdc = loginCdc;
                allData.items[i].data.loginCde = loginCde;
                sendDataJson.push(
                    allData.items[i].data
                );
            }
        }


        if ( encodeType ) {
			return Ext.encode(sendDataJson);
		}else{
			return sendDataJson;
		}

    },




	onExcelExport : function() {
		var me = this;
		var gv = me.getView();
		var cols = gv.getGridColumns();
		var store = me.getStore();
		var flds = store.config.fields;
		var commonFn  = Terp.app.getController('TerpCommon');
		var loginCdc = commonFn.getUserInfo().cd_c;
		var loginIduser = commonFn.getUserInfo().id_user;
		//console.clear();console.log(me, gv, cols, store, flds, loginCdc, loginIduser);

		var sendDataJson = {
			loginCdc: loginCdc || 'UnknownCompany',
			loginIduser: loginIduser || 'UnknownUser',
			title: me.title || me.excelTitle || 'TerpWorkbook',
			header: [], dataIndex: [], values: []
			//, type: []
		};

		for (var c=0; c<cols.length; c++) {
			var col = cols[c];
			if (!col.hidden && !Ext.isEmpty(col.dataIndex) && !col.excelIgnore) {
				sendDataJson.header.push(col.text);
				sendDataJson.dataIndex.push(col.dataIndex);
				if (!Ext.isEmpty(flds)) {
					var fm = Ext.Array.findBy(flds, function (el) {
						return (el.name === col.dataIndex);
					});
					//var type = (Ext.isEmpty(fm) || Ext.isEmpty(fm.type) || (fm.type === 'auto')) ? 'string' : fm.type;
					//sendDataJson.type.push(type);
				}
			}
		}
		//console.log(sendDataJson);
		for (var r=0; r<store.getCount(); r++) {
			var rdata = store.getAt(r).getData();
			var row = {};
			for (var key in rdata) {
				if (Ext.Array.contains(sendDataJson.dataIndex,key)) {
					row[key] = rdata[key];
				}
			}
			sendDataJson.values.push(row);
		}
		// console.log(sendDataJson);

		me.mask('엑셀 변환중...');
		Ext.Ajax.request({
			url: '../ServerPage/common/excelExport.jsp',
			params: {
				sendData: '['+Ext.encode(sendDataJson)+']'
			},

			
			success: function (res) {
				me.unmask();
				var obj = Ext.JSON.decode(res.responseText);
				if (obj.success) {
					commonFn.toastMessage('정상적으로 변환하였습니다', 't');
					var res = obj.data[0];
					if (!Ext.isEmpty(res.path) && !Ext.isEmpty(res.fn)) {
						var url = '../ServerPage/common/download.jsp?fn=' + res.fn + '&path=' + res.vp;
						UserConnectionManager.UnloadCheckFg = false;
						self.location.href = url;

					}
				}
				else {
					Ext.Msg.alert('오류', obj.msg);
                    me.unmask();
				}
			},
			fail: function () {
				me.unmask();
				Ext.Msg.alert('오류', '데이타처리중 오류가 발생했습니다');
			}
		});
	},

    onExcelQuickExport : function() {
        var me = this;

        var gv = me.getView();
        var cols = gv.getGridColumns();
        var store = me.getStore();
        var flds = store.config.fields;
        var commonFn  = Terp.app.getController('TerpCommon');
        var loginCdc = commonFn.getUserInfo().cd_c;
        var loginIduser = commonFn.getUserInfo().id_user;
        //console.clear();console.log(me, gv, cols, store, flds, loginCdc, loginIduser);

        var sendDataJson = {
            loginCdc: loginCdc || 'UnknownCompany',
            loginIduser: loginIduser || 'UnknownUser',
            title: me.title || me.excelTitle || 'TerpWorkbook',
            header: [], dataIndex: [], values: []
            //, type: []
        };

        for (var c=0; c<cols.length; c++) {
            var col = cols[c];
            if (!col.hidden && !Ext.isEmpty(col.dataIndex) && !col.excelIgnore) {
                sendDataJson.header.push(col.text);
                sendDataJson.dataIndex.push(col.dataIndex);
                if (!Ext.isEmpty(flds)) {
                    var fm = Ext.Array.findBy(flds, function (el) {
                        return (el.name === col.dataIndex);
                    });
                    //var type = (Ext.isEmpty(fm) || Ext.isEmpty(fm.type) || (fm.type === 'auto')) ? 'string' : fm.type;
                    //sendDataJson.type.push(type);
                }
            }
        }
        //console.log(sendDataJson);
        for (var r=0; r<store.getCount(); r++) {
            var rdata = store.getAt(r).getData();
            var row = {};
            for (var key in rdata) {
                if (Ext.Array.contains(sendDataJson.dataIndex,key)) {
                    row[key] = rdata[key];
                }
            }
            sendDataJson.values.push(row);
        }
        // console.log(sendDataJson);

        me.mask('엑셀 변환중...');
        var xlsxData = [{
            sheetName: sendDataJson.title,
            data: []
        }];

        var headerRow = [];
        for (var i=0; i<sendDataJson.header.length; i++) {
            headerRow.push({ text: sendDataJson.header[i] });
        }

        xlsxData[0].data.push(headerRow);
		//헤더dataindex정보 제외 jiscraft 220621
        // var didxRow = [];
        // for (var i=0; i<sendDataJson.dataIndex.length; i++) {
        //     didxRow.push({ text: sendDataJson.dataIndex[i] });
        // }
        // xlsxData[0].data.push(didxRow);

        for (var r=0; r<sendDataJson.values.length; r++) {
            var dataRow = [];
            for (var c=0; c<sendDataJson.dataIndex.length; c++) {
                dataRow.push({ text: sendDataJson.values[r][sendDataJson.dataIndex[c]] });
            }
            xlsxData[0].data.push(dataRow);
        }
        Jhxlsx.export(xlsxData, {
            fileName: sendDataJson.title
        });
        me.unmask();
    },


	hideTools: function(isHide) {
		var me = this;
		if (!((typeof(me.hiddenTools) === 'string') && (me.hiddenTools.toLowerCase() === 'all'))) {
			Ext.Array.each(me.tools, function (tool) {
				if (tool.cls === 'tsoft-component-tool') tool[(isHide) ? 'hide' : 'show']();
			});
			Ext.Array.each(me.hiddenTools, function (type) {
				me.tools[type].hide();
			});
		}
	},

	// 그리드 컬럼인덱스 가져오기 20160811 bkoh
	getRowIndex: function(record) {
		var me = this;
		if (Ext.isEmpty(record)) return -1;
		return me.getStore().indexOf(record);
	},



	// 그리드 컬럼인덱스 가져오기 20160811 bkoh
	getColumnIndex: function(dataIndex) {
		var me = this;
		var columns = me.getColumns();
		if (Ext.isEmpty(dataIndex) || (columns.length < 1)) return -1;
		for (var i=0; i<columns.length; i++) {
			if (columns[i].dataIndex === dataIndex) break;
		}
		return (i === columns.length) ? -1 : i;
	},

	// 그리드 edit position 가져오기 20160811 bkoh
	getEditPosition: function(record, dataIndex) {
		var me = this;
		if (Ext.isEmpty(record) || Ext.isEmpty(dataIndex)) return null;
		var rowIdx = me.getRowIndex(record);
		var colIdx = me.getColumnIndex(dataIndex);
		if ((rowIdx === -1) || (colIdx === -1)) return null;
		return { row: rowIdx, column: colIdx };
	},

	// 그리드 start edit 20160811 bkoh
	startEdit: function(record, dataIndex) {
		var me = this;
		if (Ext.isEmpty(record) || Ext.isEmpty(dataIndex)) return -1;
		me.getSelectionModel().select(record);
		var pos = me.getEditPosition(record, dataIndex);
		if (!Ext.isEmpty(pos) && !Ext.isEmpty(me.getPlugin('cellplugin'))) {
			me.getPlugin('cellplugin').startEditByPosition(pos);
		}
	},


	isDirty : function(){
		var store = this.getStore();
		var modifyCount = store.getModifiedRecords().length ;
		var removedCount = store.getRemovedRecords().length ;

		if (modifyCount != 0){
			return true ;
		}

		if (removedCount != 0){
			return true ;
		}

		return false ;
	},

	selectAndScroll : function(rowint){
		var me = this;

		if ( Ext.isEmpty(me.getStore()) || me.getStore().data.length == 0 ){
			return;
		}

		if ( rowint == 0 || rowint == null ){
			rowint = 0;
		}

		this.getSelectionModel().select(rowint);
		// this.getView().getRow(rowint).scrollIntoView();
		this.getView().bufferedRenderer.scrollTo(rowint, true);
	},

	setActiveButton : function(jsonValue){
		var me = this;

		if(Ext.isEmpty(me) || me == undefined){
			return;
		}

		var selectMenuData ='';
		me.hiddenTools =[];

		if ( Ext.isEmpty(me.up('[name=thisPage]'))){
			return;
		}

		if ( Ext.isEmpty(me.up('[name=thisPage]').config.popupParamView)){
			selectMenuData = me.up('[name=thisPage]').config.selectMenuData;
		}else{
			selectMenuData = me.up('[name=thisPage]').config.popupParamView.config.selectMenuData;
		}

		if (selectMenuData.yn_insert == 'Y'){
			if (jsonValue.insert != 'Y'){
				me.hiddenTools.push('plus');
			}
		}else{
			me.hiddenTools.push('plus');
		}

		if (selectMenuData.yn_modify == 'Y'){
			if (jsonValue.modify != 'Y'){
				me.hiddenTools.push('edit');
			}
		}else{
			me.hiddenTools.push('edit');
		}

		if (selectMenuData.yn_delete == 'Y'){
			if (jsonValue.delete != 'Y'){
				me.hiddenTools.push('minus');
			}
		}else{
			me.hiddenTools.push('minus');
		}

		if (selectMenuData.yn_save == 'Y'){
			if (jsonValue.save != 'Y'){
				me.hiddenTools.push('save');
			}
		}else{
			me.hiddenTools.push('save');
		}

		if (jsonValue.copy != 'Y'){
			me.hiddenTools.push('copy');
		}

		if (selectMenuData.yn_insert == 'Y'){
			if (jsonValue.import != 'Y'){
				me.hiddenTools.push('import');
			}
		}else{
			me.hiddenTools.push('import');
		}

		if (jsonValue.export != 'Y'){
			me.hiddenTools.push('export');
		}

		if (jsonValue.cancel != 'Y'){
			me.hiddenTools.push('cancel');
		}

		me.fireEvent('afterrender' , me);
	}




});



