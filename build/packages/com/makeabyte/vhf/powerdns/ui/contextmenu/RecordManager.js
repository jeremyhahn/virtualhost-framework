if(!window.qxsettings)qxsettings={};if(qxsettings["qx.version"]==undefined)qxsettings["qx.version"]="0.0";if(qxsettings["qx.isSource"]==undefined)qxsettings["qx.isSource"]=false;if(!window.qxvariants)qxvariants={};qx.Class.define("packages.com.makeabyte.vhf.powerdns.ui.contextmenu.RecordManager",{extend:vhf.Main,properties:{WireFrame:{init:vhf.Main.getInstance()},Menu:{init:new qx.ui.menu.Menu},Table:{},RowData:{init:[]},Callback:{},ZoneDn:{}},construct:function(obj){this.setTable(obj[0]);this.setRowData(obj[1]);this.setCallback(obj[2]);this.setZoneDn(obj[3]);this.getMenu().addToDocument();var tbl=this.getTable();tbl.setContextMenu(this.getMenu());tbl.addEventListener("contextmenu",function(e){this.flushMenu();this.showContextMenu(e);},this);},members:{flushMenu:function(){this.getMenu().removeAll();},__deleteRecord:function(obj){this.getWireFrame()._setStatusText("Deleting requested "+obj[1]+"...");var json='['+'{ "name" : "dn", "dn" : "'+obj[0]+'"},'+'{ "name" : "'+obj[1]+'", "'+obj[1]+'" : "'+obj[2]+'"}'+']';var callback=qx.lang.Function.bind(this.__deleteRecordHandler,this);this.getWireFrame()._callAsyncRpc(callback,"core.rpc.API","invoke","DNS","deleteRecord",json);},__deleteRecordHandler:function(result,ex,id){if(ex!=null){this.getWireFrame()._showAlertDialog("error",ex,"RPC Error");this.getWireFrame()._setStatusText("RPC Error!");}if(result){this.getCallback()();this.getWireFrame()._setStatusText("Ready");}},showContextMenu:function(ev){var del=new qx.client.Command;del.addEventListener("execute",function(e){var table=e.getData().getParentMenu().getOpener();var selectedObjects=table.getSelectionModel().getSelectedRanges();for(var i=0;i<selectedObjects.length;i++){var confirmCallback=qx.lang.Function.bind(this.__deleteRecord,this);this.getWireFrame()._showConfirmDialog("Are you sure you want to delete this "+table.getTableModel().getValue(0,selectedObjects[i].minIndex)+"?","Delete Record",confirmCallback,Array(table.getTableModel().getValue(2,selectedObjects[i].minIndex).dn,table.getTableModel().getValue(0,selectedObjects[i].minIndex),table.getTableModel().getValue(1,selectedObjects[i].minIndex)));}},this);var add=new qx.client.Command;add.addEventListener("execute",function(e){var table=e.getData().getParentMenu().getOpener();this.getWireFrame()._loadPackage("packages.com.makeabyte.vhf.powerdns.ui.RecordChooser",Array(this.getZoneDn(),this.getCallback()));},this);this.getMenu().add(new qx.ui.menu.Button("New","icon/16/actions/edit-add.png",add));this.getMenu().add(new qx.ui.menu.Button("Delete","icon/16/actions/edit-delete.png",del));this.getTable().getContextMenu().setLeft(ev.getClientX());this.getTable().getContextMenu().setTop(ev.getClientY());this.getTable().getContextMenu().setOpener(this.getTable());this.getTable().getContextMenu().show();},terminate:function(){this.base(arguments);}}});
