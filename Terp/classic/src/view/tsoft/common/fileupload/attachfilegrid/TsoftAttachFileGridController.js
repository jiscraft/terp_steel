/**
 * Created by Andrew on 2016-06-09.
 */
Ext.define('Terp.view.tsoft.common.fileupload.attachfilegrid.TsoftAttachFileGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftattachfilegrid',

	control: {
		'tsoftattachfilegrid': {
			boxready: 'onTsoftAttachFileGrid_BoxReady',
			selectionchange: 'onTsoftAttachFileGrid_SelectionChange'
		},
		'toolbar filefield': {
			change: 'onToolbarFileField_Change'
		}
	},

    init: function() {
		//console.clear();//console.log(this);
	},

	onTsoftAttachFileGrid_BoxReady: function(grid) {
		var me = this;
		grid.tools.plus.handler = function() {
			//console.log(grid.down('toolbar filefield').fileInputEl.dom.files);
			grid.down('toolbar filefield').fileInputEl.dom.click();
		};
		grid.tools.minus.handler = function() {
			//console.log(arguments);
			//console.log(grid.getSelectionModel().getSelection());
			grid.getStore().remove(grid.getSelectionModel().getSelection());
			grid.getView().refresh();
			var rowIdx = grid.getGridRowIdx();
			if (rowIdx > 0) grid.getSelectionModel().select(rowIdx-1);
			if (me.getView().up('fileuploadwindow')) {
				me.getView().up('fileuploadwindow').getController().onAttachGridDataChanged();
			}
		};

		grid.headerCt.child('[dataIndex=progress]').hide();
		grid.tools.minus.setDisabled(true);

		me.resetToolbarFileField();
	},

	onTsoftAttachFileGrid_SelectionChange: function(selModel, selected) {
		var me = this;
		me.getView().tools.minus.setDisabled(Ext.isEmpty(selected));
	},

	onToolbarFileField_Change: function(fld, v) {
		//console.log(fld.fileInputEl.dom.files);
		var me = this;
		me.uploadFiles(fld.fileInputEl.dom.files);
	},

	onDropFiles: function(files) {
		var me = this;
		me.uploadFiles(files);
	},

	uploadFiles: function(files) {
    	var me = this;
		var store = me.getView().getStore();
		if (Ext.isEmpty(me.getView().maxUploadFiles) || (me.getView().maxUploadFiles < 0)) me.getView().maxUploadFiles = 20;
		for (var i=0; i<files.length; i++) {
			var isDup = false;
			var file = files[i];
			var ufn = encodeURIComponent(file.name + file.type + file.size + file.lastModified);
			store.each(function(item) {
				var sfn = item.get('file_info');
				if (ufn === sfn) isDup = true;
			});
			if (!isDup) {
				if (store.getCount() === me.getView().maxUploadFiles) {
					Ext.Msg.alert('알림', '첨부파일은 최대 ' + me.getView().maxUploadFiles + '개만 업로드하실 수 있습니다.');
					break;
				}
				store.insert(0, {
					no_af: Terp.app.getController('TerpCommon').sqlRowId(),
					id_row_src: me.getView().up('[name=thisPage]').popupParams.id_row_src,
					fg_sy210: me.getView().up('[name=thisPage]').popupParams.fg_sy210 || '2000',
					fg_sy210_ll: me.getView().up('[name=thisPage]').popupParams.fg_sy210_ll || '',
					dc_save_path: '',
					dc_src_name: file.name,
					dc_src_mime: file.type,
					dc_src_size: file.size,
					started: false,
					progress: 0,
					completed: false,
					success: false,
					file_data: file,
					file_info: ufn
				});
				me.getView().getView().refresh();
			}
		}
		//console.log(store);
		//me.getView().headerCt.child('[dataIndex=progress]').show();

		var uploadFolder = me.getView().up('[name=thisPage]').popupParams.upload_folder;
		if (Ext.isEmpty(uploadFolder)) uploadFolder = 'Attachments';

		var uploadRecs = [];
		for (var r=0; r<store.getCount(); r++) {
			var rec = store.getAt(r);
			if (!rec.get('started') && !rec.get('completed') && !Ext.isEmpty(rec.get('file_data'))) {
				uploadRecs.push(rec);
			}
		}

		me.uploadedCnt = 0;
		me.totalUploadCnt = uploadRecs.length;
		for (var r=0; r<me.totalUploadCnt; r++) {
			var rec = uploadRecs[r];
			var formData = new FormData();
			formData.append('noAf', rec.get('no_af'));
			formData.append('fn', Ext.String.format('{0}', rec.get('no_af')));
			// 20220222 formData.append('fn', Ext.String.format('{0}_{1}', rec.get('no_af'), rec.get('id_row_src')));
			formData.append('UploadFiles', rec.get('file_data'));
			formData.append('pfx', uploadFolder);

			rec.set('started', true);
			me.uploadViaXhr(rec, formData);
		}
	},

	uploadViaXhr: function(rec, formData) {
		var me = this;
		var xhr = new XMLHttpRequest();
		xhr.upload.addEventListener('progress', function(event) { me.uploadProgress(event, rec); }, false);
		xhr.addEventListener('load', function(event) { me.uploadComplete(event, rec); }, false);
		xhr.open('POST', '/ServerPage/common/upload.jsp', false);
		xhr.send(formData);
	},

	uploadProgress: function(event, rec) {
		var me = this;
		var progress = Math.round(event.loaded / event.total);
		//console.log(progress);
		rec.set('progress', progress);
	},

	uploadComplete: function(event, rec) {
		var me = this;
		var store = me.getView().getStore();
		var obj = Ext.JSON.decode(event.target.responseText);
		rec.set('success', obj.success);
		rec.set('completed', true);
		rec.set('file_data', null);
		rec.set('progress', 1);
		if (obj.success === true) {
			////console.log(obj.data);
			rec.set('dc_save_path', obj.data[0].vpath);
			if (Ext.isEmpty(rec.get('dc_src_mime'))) rec.set('dc_src_mime', obj.data[0].mimetype);
		}
		else {
		}
		me.uploadedCnt++;
		if (me.uploadedCnt === me.totalUploadCnt) {
			Terp.app.getController('TerpCommon').toastMessage('파일업로드 완료!', 'b');
			me.getView().headerCt.child('[dataIndex=progress]').hide();
			me.resetToolbarFileField();
			if (me.getView().up('fileuploadwindow')) {
				me.getView().up('fileuploadwindow').getController().onAttachGridDataChanged();
			}
		}
	},

	resetToolbarFileField: function() {
		var me = this;
		me.getView().down('toolbar filefield').reset();
		me.getView().down('toolbar filefield').fileInputEl.set({
			multiple: 'multiple'
		});
	}

});