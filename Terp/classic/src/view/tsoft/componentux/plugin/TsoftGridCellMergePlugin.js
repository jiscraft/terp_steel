/**
 * Created by Andrew on 2016-06-16.
 */
Ext.define('Terp.view.tsoft.componentux.plugin.TsoftGridCellMergePlugin', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.tsoftgridcellmerge',
	requires: [
		'Ext.util.Format'
	],


	init: function(grid) {
		var me = this;
		me.grid = grid;

		// SubTotal 기능 처리를 위한 대표 selector 설정
		grid.addCls('grid-row-span');
		//grid.bufferedRenderer = !grid.enableCellMergePlugin;

		// subtotal용 변수 초기화
		grid.enableCellMergePlugin = true;	// cell merge 플러그인 사용 여부
		grid.enableSubTotal = (grid.lockable || Ext.isEmpty(grid.enableSubTotal)) ? false : grid.enableSubTotal;	// sub total 적용여부
		grid.subTotalColumns = [];	// 합계를 계산할 컬럼 정보
		grid.subTotalData = [];	// 컬럼별 합계 데이터

		// 총계 표시여부
		grid.grandTotal = (Ext.isEmpty(grid.grandTotal)) ? true : false;

		// 상위 row의 필드 데이터와 중복되면 공백 처리
		grid.getMergeValue = Ext.bind(me.getMergeValue, me);
		if (grid.lockable) {
			grid.lockedGrid.getMergeValue = Ext.bind(me.getMergeValue, me);
			grid.normalGrid.getMergeValue = Ext.bind(me.getMergeValue, me);
		}

		if (!grid.lockable) {
			me.getSubTotalColumns();
			if (me.grid.subTotalColumns.length < 1) me.grid.enableSubTotal = false;

			me.grid.on('reconfigure', function (grid, newStore, newColumns, oldStore, oldColumns) {
				me.getSubTotalColumns();
				if (me.grid.subTotalColumns.length < 1) me.grid.enableSubTotal = false;
			});

			// 그리드가 새로 그려질 때 SubTotal 다시 계산 및 렌더
			me.grid.getView().on({
				refresh: function (gv) {
					me.onGridRefresh();
				},
				scope: me
			});
		}

		return me.callParent(arguments);
	},

	// 상위 row의 필드 데이터와 중복되면 공백 처리
	getMergeValue: function(value, metaData, record, rowIndex, colIndex, store, view) {
		var me = this;
		var grid = (!Ext.isEmpty(view.grid.ownerGrid) && view.grid.ownerGrid.lockable) ? view.grid.ownerGrid : view.grid;
		if (!me.grid.enableCellMergePlugin) return value;

		var columns = me.grid.getColumns();
		var dataIndex = columns[colIndex].dataIndex;
		var first = !rowIndex || (rowIndex === 0);
		var last = (rowIndex === (store.getCount() - 1));
		var same;

		if (view.grid.reference == 'mm17a1801_grid1' && dataIndex.substring(0,2) == 'fg') {
			same = !first && (value == store.getAt(rowIndex - 1).get('nm_' + dataIndex.substring(3,8)));
			first = first || !same;
			last = last || (!last && (value !== store.getAt(rowIndex + 1).get('nm_' + dataIndex.substring(3,8))));
		} else {
			same = !first && (value === store.getAt(rowIndex - 1).get(dataIndex));
			first = first || !same;
			last = last || (!last && (value !== store.getAt(rowIndex + 1).get(dataIndex)));
		}

		//var same = !first && (value === store.getAt(rowIndex - 1).get(dataIndex));
		//first = first || !same;
		//last = last || (!last && (value !== store.getAt(rowIndex + 1).get(dataIndex)));
		//var same = (!first && (value === store.getAt(rowIndex - 1).get(dataIndex))) || (!last && (value !== store.getAt(rowIndex + 1).get(dataIndex)));

		metaData.css = (Ext.isEmpty(metaData.css) ? '' : metaData.css) + ' row-span-cell';
		if (first) metaData.css = metaData.css + ' row-span-first';
		if (last) metaData.css = metaData.css + ' row-span-last';
		if (same) metaData.css = metaData.css + ' row-span-same';

		return same ? '' : value;
	},

	// 그리드가 새로 그려질 때 SubTotal 다시 계산 및 렌더
	onGridRefresh: function() {
		var me = this;
		//console.log(me.grid.enableCellMergePlugin, me.grid.enableSubTotal, (!me.grid.enableCellMergePlugin || !me.grid.enableSubTotal));
		// 합계를 계산할 컬럼의 설정 정보 가져옴
		if (!me.grid.enableCellMergePlugin || !me.grid.enableSubTotal) return;

		me.removeSubTotalRows();
		me.getSubTotalColumns();

		// SubTotal row를 추가하기 위한 기준 필드 (현재 버전에서는 그룹의 맨 마지막 row 첫번째 컬럼만 적용)
		var refCells = me.grid.getView().getEl().select('.row-span-cell.row-span-last.x-grid-cell-first').elements;
		//console.log(refCells);
		if (!Ext.isEmpty(refCells)) {
			// 그룹별 기준 row 배열 처리
			var refGridItems = [];
			Ext.Array.each(refCells, function(refCell) {
				var refGridItem = refCell.parentNode.parentNode.parentNode;
				if (Ext.Array.indexOf(refGridItems, refGridItem) < 0) {
					refGridItems.push(refGridItem);
				}
			});

			if (!Ext.isEmpty(refGridItems)) {
				// SubTotal row 추가 후 그룹별 기준 row css 추가
				Ext.Array.each(refGridItems, function(refGridItem) {
					// SubTotal row 추가
					var newGridItem = me.renderSubTotalRows(refGridItem, false);

					// 그룹별 기준 row css 추가
					var firstCell = refGridItem.getElementsByClassName('x-grid-cell-first')[0];
					firstCell.style.borderBottomWidth = '0';
					refGridItem.className = refGridItem.className + ' row-span-subtotal-prev';
				});

				// 컬럼별 합계 데이터를 가져옴
				me.getSubTotalData();

				// sub total 렌더
				Ext.Array.each(me.grid.subTotalData, function (item) {
					var cells = item.node.childNodes[0].childNodes[0].childNodes;
					cells[0].firstChild.style.textAlign = 'right';
					cells[0].firstChild.innerHTML = '소&nbsp;&nbsp;&nbsp;계';
					Ext.Array.each(me.grid.subTotalColumns, function (subTotalColumn) {

						var total = item.data[subTotalColumn.dataIndex].total;
						var renderer = subTotalColumn.subTotalRenderer;

						if (!Ext.isEmpty(renderer)) {
							var format = me.getSubTotalRenderFormat(renderer, subTotalColumn.subTotalRenderFormat);
							subTotalColumn.grandTotal += total;
							cells[subTotalColumn.idx].firstChild.innerHTML = Ext.util.Format[renderer](total, format);
						}
					});
				});

				if (me.grid.grandTotal) {
				// GrnadTotal row를 추가할 기준 row (맨 마지막 row)
				var gridItems = me.grid.getView().getEl().dom.getElementsByClassName('x-grid-item-container')[0].childNodes;
				var refGridItem = gridItems[gridItems.length - 1];

				// GrnadTotal row 추가
				var newGridItem = me.renderSubTotalRows(refGridItem, true);

				// GrandTotal row에 합계 데이터 렌더
					var newGridCells = newGridItem.childNodes[0].childNodes[0].childNodes;
					newGridCells[0].firstChild.innerHTML = '총&nbsp;&nbsp;&nbsp;계';
					Ext.Array.each(me.grid.subTotalColumns, function (subTotalColumn) {
						var renderer = subTotalColumn.subTotalRenderer;
						if (!Ext.isEmpty(renderer)) {
							var format = me.getSubTotalRenderFormat(renderer, subTotalColumn.subTotalRenderFormat);
							if (!newGridCells[subTotalColumn.idx]) return;
							newGridCells[subTotalColumn.idx].firstChild.innerHTML = Ext.util.Format[renderer](subTotalColumn.grandTotal, format);
						}
					});
				}
				else  {

				}
			}
		}
	},

	// SubTotal row들 제거
	removeSubTotalRows: function() {
		var me = this;
		var grandTotalItems = me.grid.getView().getEl().select('.row-span-grandtotal').elements;
		////console.log(grandTotalItems);
		if (!Ext.isEmpty(grandTotalItems)) {
			Ext.Array.each(grandTotalItems, function(grandTotalItem) {
				grandTotalItem.parentNode.removeChild(grandTotalItem);
			});
		}

		var subTotalItems = me.grid.getView().getEl().select('.row-span-subtotal').elements;
		////console.log(subTotalItems);
		if (!Ext.isEmpty(subTotalItems)) {
			Ext.Array.each(subTotalItems, function(subTotalItem) {
				subTotalItem.parentNode.removeChild(subTotalItem);
			});
		}

		var subTotalPrevItems = me.grid.getView().getEl().select('.row-span-subtotal-prev').elements;
		////console.log(subTotalPrevItems);
		if (!Ext.isEmpty(subTotalPrevItems)) {
			Ext.Array.each(subTotalPrevItems, function(subTotalPrevItem) {
				subTotalPrevItem.getElementsByClassName('x-grid-cell-first')[0].style.borderBottomWidth = '1px';
				subTotalPrevItem.className = subTotalPrevItem.className.split(' row-span-subtotal-prev').join('');
			});
		}
	},

	// SubTotal row 추가 (ynGrand가 true이면 총계)
	renderSubTotalRows: function(refItem, ynGrand) {
		var newItem = refItem.cloneNode(true);
		var newRows = newItem.getElementsByClassName('x-grid-row');
		var newCells = newItem.getElementsByClassName('x-grid-cell');
		var newCellInners = newItem.getElementsByClassName('x-grid-cell-inner');

		if (ynGrand) {
			newItem.id = newItem.id.split('subtotal').join('grandtotal');
			newItem.className = newItem.className.split('subtotal').join('grandtotal');
		}
		else {
			newItem.id = newItem.id + '-subtotal';
			newItem.className = newItem.className + ' row-span-subtotal';
		}

		Ext.Array.each(newCells, function(newCell) {
			if (ynGrand) {
				newCell.className = newCell.className.split('subtotal').join('grandtotal');
				newCell.style.backgroundColor = 'slategray';
				newCell.style.color = 'white';
			}
			else {
				newCell.className = newCell.className + ' row-span-subtotal-cell';
				newCell.style.backgroundColor = 'silver';
			}
		});
		Ext.Array.each(newCellInners, function(newCellInner) {
			if (ynGrand) {
				newCellInner.className = newCellInner.className.split('subtotal').join('grandtotal');
				newCellInner.innerHTML = '&nbsp;';
			}
			else {
				newCellInner.className = newCellInner.className + ' row-span-subtotal-cell-inner';
				newCellInner.innerHTML = '&nbsp;';
			}
		});

		refItem.parentNode.insertBefore(newItem, refItem.nextSibling);
		////console.log(newItem);

		return newItem;
	},

	// 합계를 계산할 컬럼의 설정 정보 가져옴
	getSubTotalColumns: function() {
		var me = this;
		me.grid.subTotalColumns = [];
		Ext.Array.each(me.grid.getColumns(), function(col) {
			////console.log(col);
			if (col.enableSubTotal) {
				me.grid.subTotalColumns.push({
					idx: col.fullColumnIndex,
					xtype: col.xtype,
					dataIndex: col.dataIndex,
					subTotalRenderer: Ext.isEmpty(col.subTotalRenderer) ? '' : col.subTotalRenderer,
					subTotalRenderFormat: Ext.isEmpty(col.subTotalRenderFormat) ? '' : col.subTotalRenderFormat,
					grandTotal: 0
				});
			}
		});
		//console.log(me.grid.subTotalColumns);
	},

	// 컬럼별 합계 데이터를 가져옴
	getSubTotalData: function() {
		var me = this;
		var storeValues = {};
		var storeIdx = 0;
		var gridItems = me.grid.getView().getEl().dom.getElementsByClassName('x-grid-item-container')[0].childNodes;
		me.grid.subTotalData = [];
		Ext.Array.each(gridItems, function(item) {
			if (item.classList.contains('row-span-subtotal')) {
				me.grid.subTotalData.push({ node: item, data: storeValues });
				storeValues = {};
			}
			else {
				var store = me.grid.getStore();
				Ext.Array.each(me.grid.subTotalColumns, function(subTotalColumn) {
					if (!storeValues.hasOwnProperty(subTotalColumn.dataIndex)) {
						storeValues[subTotalColumn.dataIndex] = { values: [], total: 0 };
					}
					var val = store.getAt(storeIdx).get(subTotalColumn.dataIndex);
					storeValues[subTotalColumn.dataIndex].values.push(val);
					storeValues[subTotalColumn.dataIndex].total += val;
					//subTotalColumn.grandTotal += val;
				});
				storeIdx++;
			}
		});
		////console.log(me.grid.subTotalData);
	},

	// 렌더러별 agument 디폴트 처리
	getSubTotalRenderFormat: function(renderer, format) {
		switch (renderer) {
			case 'number':
				return Ext.isEmpty(format) ? '0,000.00' : format;
			default:
				return Ext.isEmpty(format) ? '' : format;
		}
	}



});