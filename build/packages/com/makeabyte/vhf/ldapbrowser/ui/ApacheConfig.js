if(!window.qxsettings)qxsettings={};if(qxsettings["qx.version"]==undefined)qxsettings["qx.version"]="0.0";if(qxsettings["qx.isSource"]==undefined)qxsettings["qx.isSource"]=false;if(!window.qxvariants)qxvariants={};qx.Class.define("packages.com.makeabyte.vhf.ldapbrowser.ui.ApacheConfig",{extend:vhf.Main,properties:{Parent:{init:vhf.Main.getInstance()},ApacheConfigWin:{init:new qx.ui.window.Window(" New Apache Virtual Host","resource/vhf/icon/apache.png")},objConfig:{},ParentDn:{},BaseDn:{},Callback:{}},construct:function(args){this.setObjConfig(args[0]);this.setCallback(args[1]);this.setBaseDn(args[2]);this.main();},members:{main:function(){this.getApacheConfigWin().set({showMinimize:true,allowMinimize:false,allowMaximize:true});this.getApacheConfigWin().setSpace(200,400,0,450);this.getApacheConfigWin().removeAll();this.getParent()._addToWorkspace(this.getApacheConfigWin());var at1=new qx.ui.basic.Atom("Enter the required Apache virtual host information.","resource/vhf/icon/apache.png");at1.setLocation(4,4);var tv1=new qx.ui.pageview.tabview.TabView;tv1.set({left:4,top:40,right:4,bottom:50});var t1=new qx.ui.pageview.tabview.Button("General","icon/16/devices/drive-optical.png");t1.setChecked(true);var t2=new qx.ui.pageview.tabview.Button("Members","icon/16/devices/drive-optical.png");tv1.getBar().add(t1);var p1=new qx.ui.pageview.tabview.Page(t1);tv1.getPane().add(p1);var cl1=new qx.ui.layout.CanvasLayout;cl1.setTop(0);cl1.setLeft(0);cl1.setWidth("100%");cl1.setHeight("100%");cl1.setBackgroundColor("white");cl1.setPaddingLeft(0);cl1.removeAll();var lblServerName=new qx.ui.basic.Atom('Server Name');lblServerName.setHorizontalChildrenAlign('right');lblServerName.set({top:30,left:10});var txtServerName=new qx.ui.form.TextField();txtServerName.set({top:30,right:30,width:'60%',value:(this.getObjConfig().apacheservername==undefined)?"":this.getObjConfig().apacheservername[0]});txtServerName.setReadOnly(true);var txtTip1="The domain name for the virtual host.<br><b>Example:</b> vhf.local";var tipIcon1=new qx.ui.basic.Atom("","icon/16/apps/accessories-tip.png");tipIcon1.set({top:30,right:10});var tooltipBtn1=new qx.ui.basic.Atom(txtTip1);var tt1=new qx.ui.popup.ToolTip(txtTip1);tipIcon1.setToolTip(tt1);var lblServerAlias=new qx.ui.basic.Atom('Server Alias');lblServerAlias.setHorizontalChildrenAlign('right');lblServerAlias.set({top:55,left:10});var txtServerAlias=new qx.ui.form.TextField();txtServerAlias.set({top:55,right:30,width:'60%',value:(this.getObjConfig().apacheserveralias==undefined)?"":this.getObjConfig().apacheserveralias[0]});var txtTip2="An alias name for the domain.<br><b>Example:</b> www.vhf.local";var tipIcon2=new qx.ui.basic.Atom("","icon/16/apps/accessories-tip.png");tipIcon2.set({top:55,right:10});var tooltipBtn2=new qx.ui.basic.Atom(txtTip2);var tt2=new qx.ui.popup.ToolTip(txtTip2);tipIcon2.setToolTip(tt2);var lblDocRoot=new qx.ui.basic.Atom('Document Root');lblDocRoot.setHorizontalChildrenAlign('right');lblDocRoot.set({top:80,left:10});var txtDocRoot=new qx.ui.form.TextField();txtDocRoot.set({top:80,right:30,width:'60%',value:(this.getObjConfig().apachedocumentroot==undefined)?"":this.getObjConfig().apachedocumentroot[0]});var txtTip3="The full file system path to the location where this website is served.<br><b>Example:</b> /home/jdoe/www";var tipIcon3=new qx.ui.basic.Atom("","icon/16/apps/accessories-tip.png");tipIcon3.set({top:80,right:10});var tooltipBtn3=new qx.ui.basic.Atom(txtTip3);var tt3=new qx.ui.popup.ToolTip(txtTip3);tipIcon3.setToolTip(tt3);var lblServerAdmin=new qx.ui.basic.Atom('Server Admin');lblServerAdmin.setHorizontalChildrenAlign('right');lblServerAdmin.set({top:105,left:10});var txtServerAdmin=new qx.ui.form.TextField();txtServerAdmin.set({top:105,right:30,width:'60%',value:(this.getObjConfig().apacheserveradmin==undefined)?"":this.getObjConfig().apacheserveradmin[0]});var txtTip4="The email address of the administrator responsible for this virtual host website.<br><b>Example:</b> webmaster@vhf.local";var tipIcon4=new qx.ui.basic.Atom("","icon/16/apps/accessories-tip.png");tipIcon4.set({top:105,right:10});var tooltipBtn4=new qx.ui.basic.Atom(txtTip4);var tt4=new qx.ui.popup.ToolTip(txtTip4);tipIcon4.setToolTip(tt4);var btnOK=new qx.ui.form.Button("OK","icon/16/actions/dialog-ok.png");var btnCancel=new qx.ui.form.Button("Cancel","icon/16/actions/dialog-cancel.png");btnOK.set({bottom:10,right:10});btnCancel.set({bottom:10,right:60});btnOK.addEventListener("execute",function(e){var dn="apacheServerName="+txtServerName.getValue()+","+this.getParentDn();var callback=new qx.lang.Function.bind(this.__installApacheConfigHandler,this);this.getParent()._callAsyncRpc(callback,"com.makeabyte.vhf.ldapbrowser.rpc.contextmenu.Tree","addApacheConfig",dn,txtServerName.getValue(),txtServerAlias.getValue(),txtDocRoot.getValue(),txtServerAdmin.getValue());},this);btnCancel.addEventListener("execute",function(e){this.getApacheConfigWin().close();},this);this.getApacheConfigWin().add(at1,tv1,btnOK,btnCancel);cl1.add(lblServerName,txtServerName,tipIcon1);cl1.add(lblServerAlias,txtServerAlias,tipIcon2);cl1.add(lblDocRoot,txtDocRoot,tipIcon3);cl1.add(lblServerAdmin,txtServerAdmin,tipIcon4);p1.add(cl1);this.getApacheConfigWin().open();},__installApacheConfigHandler:function(result,ex,id){if(ex!=null){this.getParent()._showAlertDialog("error",ex.toString(),"RPC Error",null);return false;}if(result){this.getParent()._callAsyncRpc(this.getCallback()(this.getParentDn().replace(","+this.getBaseDn(),"")),"com.makeabyte.vhf.ldapbrowser.rpc.Browser","getTreeSource",null);this.getApacheConfigWin().close();}},close:function(){this.base(arguments);},terminate:function(){this.base(arguments);}}});
