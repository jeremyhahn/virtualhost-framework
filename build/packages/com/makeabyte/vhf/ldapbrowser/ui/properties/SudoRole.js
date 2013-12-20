if(!window.qxsettings)qxsettings={};if(qxsettings["qx.version"]==undefined)qxsettings["qx.version"]="0.0";if(qxsettings["qx.isSource"]==undefined)qxsettings["qx.isSource"]=false;if(!window.qxvariants)qxvariants={};qx.Class.define("packages.com.makeabyte.vhf.ldapbrowser.ui.properties.SudoRole",{extend:vhf.Main,properties:{WireFrame:{init:vhf.Main.getInstance()},Menu:{init:new qx.ui.menu.Menu},SudoPropsWin:{},SudoObj:{},HostTable:{},HostModel:{},HostData:{init:[]},MemberTable:{},MemberModel:{},MemberData:{init:[]},CmdTable:{},CmdModel:{},CmdData:{init:[]},Callback:{}},construct:function(obj){this.setSudoObj(obj[0]);this.setCallback(obj[1]);this.setSudoPropsWin(new qx.ui.window.Window("Sudo Role Properties","icon/16/"+this.getWireFrame().getAppIcon()));this.getSudoPropsWin().set({showMinimize:true,allowMinimize:false,allowMaximize:true});this.getSudoPropsWin().setSpace(200,400,0,450);this.getSudoPropsWin().removeAll();var ico1=new qx.ui.basic.Atom("Sudo Role Properties","icon/32/categories/applications.png");with(ico1){setTop(5);setLeft(5);setIconPosition("left");}var tv1=new qx.ui.pageview.tabview.TabView;tv1.set({left:4,top:40,right:4,bottom:50});var t1=new qx.ui.pageview.tabview.Button("General","icon/16/mimetypes/text-ascii.png");t1.setChecked(true);var t2=new qx.ui.pageview.tabview.Button("Hosts","icon/16/devices/computer.png");var t3=new qx.ui.pageview.tabview.Button("Members","icon/16/apps/system-users.png");var t4=new qx.ui.pageview.tabview.Button("Commands","icon/16/mimetypes/text-x-script.png");tv1.getBar().add(t1,t2,t3,t4);t1.addEventListener("click",function(e){ico1.setLabel("Configure the name and description for this role.");},this);t2.addEventListener("click",function(e){ico1.setLabel("Configure the hosts which this role will apply.");},this);t3.addEventListener("click",function(e){ico1.setLabel("Configure the members which this role will apply.");},this);t4.addEventListener("click",function(e){ico1.setLabel("Configure the commands which this role will allow.");},this);var p1=new qx.ui.pageview.tabview.Page(t1);var p2=new qx.ui.pageview.tabview.Page(t2);var p3=new qx.ui.pageview.tabview.Page(t3);var p4=new qx.ui.pageview.tabview.Page(t4);tv1.getPane().add(p1,p2,p3,p4);var cl1=new qx.ui.layout.CanvasLayout;cl1.setTop(0);cl1.setLeft(0);cl1.setWidth("100%");cl1.setHeight("100%");cl1.setBackgroundColor("white");cl1.setPaddingLeft(0);cl1.removeAll();var lblName=new qx.ui.basic.Atom("Role Name");lblName.setHorizontalChildrenAlign("right");lblName.set({top:30,left:10});var txtName=new qx.ui.form.TextField();txtName.set({top:30,right:30,width:'60%',value:(this.getSudoObj().cn==undefined)?"":this.getSudoObj().cn[0]});txtName.setReadOnly(true);var txtTip1="The name used to represent this sudo role.<br><b>Example: </b>Developers";var tipIcon1=new qx.ui.basic.Atom("","icon/16/apps/accessories-tip.png");tipIcon1.set({top:30,right:10});var tooltipBtn1=new qx.ui.basic.Atom(txtTip1);var tt1=new qx.ui.popup.ToolTip(txtTip1);tipIcon1.setToolTip(tt1);var lblDescription=new qx.ui.basic.Atom("Description");lblDescription.setHorizontalChildrenAlign("right");lblDescription.set({top:55,left:10});var txtDescription=new qx.ui.form.TextField();txtDescription.set({top:55,right:30,width:'60%',value:(this.getSudoObj().description==undefined)?"":this.getSudoObj().description[0]});var txtTip2="The details concerning this sudo role.<br><b>Example: </b>System Developers";var tipIcon2=new qx.ui.basic.Atom("","icon/16/apps/accessories-tip.png");tipIcon2.set({top:55,right:10});var tooltipBtn2=new qx.ui.basic.Atom(txtTip2);var tt2=new qx.ui.popup.ToolTip(txtTip2);tipIcon2.setToolTip(tt2);this.setHostModel(new qx.ui.table.model.Simple());this.getHostModel().setColumns(["Hostname"]);var custom1={tableColumnModel:function(obj){return new qx.ui.table.columnmodel.Resize(obj);}};this.setHostTable(new qx.ui.table.Table(this.getHostModel(),custom1));with(this.getHostTable()){set({left:0,top:0,width:'99%',height:280,border:"inset-thin"});setMetaColumnCounts([1,-1]);getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);}p2.add(this.getHostTable());var tcm1=this.getHostTable().getTableColumnModel();var resizeBehavior1=tcm1.getBehavior();resizeBehavior1.setWidth(0,340);resizeBehavior1.setMinWidth(0,50);resizeBehavior1.setMaxWidth(0,600);this.getHostData().splice(0,this.getHostData().length);this.getHostModel().setData(this.getHostData());if(this.getSudoObj().sudohost!==undefined){for(var i=0;i<this.getSudoObj().sudohost.count;i++)this.getHostData().push([this.getSudoObj().sudohost[i]]);}this.getHostTable().getTableModel().setData(this.getHostData());this.setMemberModel(new qx.ui.table.model.Simple());this.getMemberModel().setColumns(["Distinguished Name"]);var custom2={tableColumnModel:function(obj){return new qx.ui.table.columnmodel.Resize(obj);}};this.setMemberTable(new qx.ui.table.Table(this.getMemberModel(),custom2));with(this.getMemberTable()){set({left:0,top:0,width:'99%',height:280,border:"inset-thin"});setMetaColumnCounts([1,-1]);getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);}p3.add(this.getMemberTable());var tcm2=this.getMemberTable().getTableColumnModel();var resizeBehavior2=tcm2.getBehavior();resizeBehavior2.setWidth(0,340);resizeBehavior2.setMinWidth(0,50);resizeBehavior2.setMaxWidth(0,600);this.getMemberData().splice(0,this.getMemberData().length);this.getMemberModel().setData(this.getMemberData());if(this.getSudoObj().sudouser!==undefined){for(var i=0;i<this.getSudoObj().sudouser.count;i++)this.getMemberData().push([this.getSudoObj().sudouser[i]]);}this.getMemberTable().getTableModel().setData(this.getMemberData());this.setCmdModel(new qx.ui.table.model.Simple());this.getCmdModel().setColumns(["Command"]);var custom3={tableColumnModel:function(obj){return new qx.ui.table.columnmodel.Resize(obj);}};this.setCmdTable(new qx.ui.table.Table(this.getCmdModel(),custom3));with(this.getCmdTable()){set({left:0,top:0,width:'99%',height:280,border:"inset-thin"});setMetaColumnCounts([1,-1]);getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);}p4.add(this.getCmdTable());var tcm3=this.getCmdTable().getTableColumnModel();var resizeBehavior3=tcm3.getBehavior();resizeBehavior3.setWidth(0,340);resizeBehavior3.setMinWidth(0,50);resizeBehavior3.setMaxWidth(0,600);this.getCmdData().splice(0,this.getCmdData().length);this.getCmdModel().setData(this.getCmdData());if(this.getSudoObj().sudocommand!==undefined){for(var i=0;i<this.getSudoObj().sudocommand.count;i++)this.getCmdData().push([this.getSudoObj().sudocommand[i]]);}this.getCmdTable().getTableModel().setData(this.getCmdData());var btnCancel=new qx.ui.form.Button("Cancel","icon/16/actions/dialog-cancel.png");btnCancel.addEventListener("execute",function(e){this.getSudoPropsWin().close();},this);btnCancel.set({bottom:10,right:65});var btnOK=new qx.ui.form.Button("OK","icon/16/actions/dialog-ok.png");btnOK.addEventListener("execute",function(e){var hosts="";var count=this.getHostTable().getTableModel().getRowCount();for(i=0;i<count;i++){if(this.getSudoObj().sudohost==undefined){hosts+=(i<count-1)?this.getHostTable().getTableModel().getValue(0,i)+"|":this.getHostTable().getTableModel().getValue(0,i);continue;}hosts+=(i<count-1)?this.getHostTable().getTableModel().getValue(0,i)+"|":this.getHostTable().getTableModel().getValue(0,i);}var members="";count=this.getMemberTable().getTableModel().getRowCount();for(i=0;i<count;i++){if(this.getSudoObj().sudouser==undefined){if(this.getMemberTable().getTableModel().getValue(0,i).indexOf("=")>=0)members+=(i<count-1)?this.getMemberTable().getTableModel().getValue(0,i).split(",")[0].split("=")[1]+"|":this.getMemberTable().getTableModel().getValue(0,i).split(",")[0].split("=")[1];else members+=(i<count-1)?this.getMemberTable().getTableModel().getValue(0,i)+"|":this.getMemberTable().getTableModel().getValue(0,i);continue;}if(this.getMemberTable().getTableModel().getValue(0,i).indexOf("=")>=0)members+=(i<count-1)?this.getMemberTable().getTableModel().getValue(0,i).split(",")[0].split("=")[1]+"|":this.getMemberTable().getTableModel().getValue(0,i).split(",")[0].split("=")[1];else members+=(i<count-1)?this.getMemberTable().getTableModel().getValue(0,i)+"|":this.getMemberTable().getTableModel().getValue(0,i);}var cmds="";count=this.getCmdTable().getTableModel().getRowCount();for(i=0;i<count;i++){if(this.getSudoObj().sudocommand==undefined){cmds+=(i<count-1)?this.getCmdTable().getTableModel().getValue(0,i)+"|":this.getCmdTable().getTableModel().getValue(0,i);continue;}cmds+=(i<count-1)?this.getCmdTable().getTableModel().getValue(0,i)+"|":this.getCmdTable().getTableModel().getValue(0,i);}var callback=qx.lang.Function.bind(this.__updateRoleHandler,this);this.getWireFrame()._callAsyncRpc(callback,"core.rpc.API","invoke","SUDO","updateRole",this.getSudoObj().dn,txtName.getValue(),txtDescription.getValue(),hosts,members,cmds);},this);btnOK.set({bottom:10,right:10});p1.add(cl1);cl1.add(lblName,txtName,tipIcon1);cl1.add(lblDescription,txtDescription,tipIcon2);this.getSudoPropsWin().add(btnOK,btnCancel);this.getSudoPropsWin().add(ico1,tv1);this.getWireFrame()._addToWorkspace(this.getSudoPropsWin());var lblCopyright=new qx.ui.basic.Label(this.getWireFrame().getCopyright());lblCopyright.set({bottom:15,left:10});this.getSudoPropsWin().add(lblCopyright);this.getSudoPropsWin().open();this.__loadContextMenu("AddRemoveMember",Array(this.getMemberTable(),this.getMemberData()));this.getMenu().addToDocument();this.getHostTable().setContextMenu(this.getMenu());this.getHostTable().addEventListener("contextmenu",function(e){this.getMenu().removeAll();this.__showHostContextMenu(e);},this);this.getCmdTable().setContextMenu(this.getMenu());this.getCmdTable().addEventListener("contextmenu",function(e){this.getMenu().removeAll();this.__showCommandContextMenu(e);},this);},members:{__showHostContextMenu:function(ev){var add=new qx.client.Command;add.addEventListener("execute",function(e){var callback=qx.lang.Function.bind(this.__addHostHandler,this);this.getWireFrame()._showPromptDialog("Enter the new hostname.","Add Host",callback);},this);var del=new qx.client.Command;del.addEventListener("execute",function(e){var table=e.getData().getParentMenu().getOpener();var selectedObjects=table.getSelectionModel().getSelectedRanges();for(var i=0;i<selectedObjects.length;i++){var confirmCallback=qx.lang.Function.bind(this.__confirmDeleteHandler,this);this.getWireFrame()._showConfirmDialog("Are you sure you want to delete "+table.getTableModel().getValue(0,selectedObjects[i].minIndex)+"?","Delete Sudo Host",confirmCallback,Array(table,table.getTableModel().getValue(0,selectedObjects[i].minIndex)));}},this);this.getMenu().add(new qx.ui.menu.Button("Add","icon/16/actions/edit-new.png",add));this.getMenu().add(new qx.ui.menu.Button("Remove","icon/16/actions/edit-delete.png",del));this.getHostTable().getContextMenu().setLeft(ev.getClientX());this.getHostTable().getContextMenu().setTop(ev.getClientY());this.getHostTable().getContextMenu().setOpener(this.getHostTable());this.getHostTable().getContextMenu().show();},__showCommandContextMenu:function(ev){var add=new qx.client.Command;add.addEventListener("execute",function(e){var callback=qx.lang.Function.bind(this.__addCommandHandler,this);this.getWireFrame()._showPromptDialog("Enter the new command.","Add Command",callback);},this);var del=new qx.client.Command;del.addEventListener("execute",function(e){var table=e.getData().getParentMenu().getOpener();var selectedObjects=table.getSelectionModel().getSelectedRanges();for(var i=0;i<selectedObjects.length;i++){var confirmCallback=qx.lang.Function.bind(this.__confirmDeleteHandler,this);this.getWireFrame()._showConfirmDialog("Are you sure you want to delete "+table.getTableModel().getValue(0,selectedObjects[i].minIndex)+"?","Delete Sudo Command",confirmCallback,Array(table,table.getTableModel().getValue(0,selectedObjects[i].minIndex)));}},this);this.getMenu().add(new qx.ui.menu.Button("Add","icon/16/actions/edit-new.png",add));this.getMenu().add(new qx.ui.menu.Button("Remove","icon/16/actions/edit-delete.png",del));this.getCmdTable().getContextMenu().setLeft(ev.getClientX());this.getCmdTable().getContextMenu().setTop(ev.getClientY());this.getCmdTable().getContextMenu().setOpener(this.getCmdTable());this.getCmdTable().getContextMenu().show();},__confirmDeleteHandler:function(args){var selectedObjects=args[0].getSelectionModel().getSelectedRanges();for(var i=0;i<selectedObjects.length;i++)args[0].getTableModel().removeRows(selectedObjects[i].minIndex,1);},__updateRoleHandler:function(result,ex,id){if(ex!=null){this.getWireFrame()._showAlertDialog("error",ex.toString(),"RPC Error");this.getWireFrame()._setStatusText("RPC Error!");}if(result){var parentDn=this.getSudoObj().dn.replace("cn="+this.getSudoObj().cn[0]+",","");this.getCallback()(parentDn);this.getSudoPropsWin().close();}},__addHostHandler:function(input){this.getHostData().push([input]);this.getHostTable().getTableModel().setData(this.getHostData());},__addCommandHandler:function(input){this.getCmdData().push([input]);this.getCmdTable().getTableModel().setData(this.getCmdData());},__loadContextMenu:function(type,obj){this.getWireFrame()._loadPackage("packages.com.makeabyte.vhf.ldapbrowser.ui.contextmenu."+type,obj);},terminate:function(){this.base(arguments);}}});
