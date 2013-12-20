if(!window.qxsettings)qxsettings={};if(qxsettings["qx.version"]==undefined)qxsettings["qx.version"]="0.0";if(qxsettings["qx.isSource"]==undefined)qxsettings["qx.isSource"]=false;if(!window.qxvariants)qxvariants={};qx.Class.define("packages.core.ui.window.PackageSettings",{extend:vhf.Main,properties:{Parent:{init:vhf.Main.getInstance()},PkgSettingsWin:{init:new qx.ui.window.Window("Package Settings","icon/16/mimetypes/package-x-generic.png")},PkgDefaultMemberDn:{init:new qx.ui.form.TextField()},PkgOuDn:{init:new qx.ui.form.TextField()},UpdateBtn:{init:new qx.ui.form.Button("Apply","icon/16/actions/dialog-apply.png")}},construct:function(){this.main();},members:{main:function(){this.getPkgSettingsWin().set({showMinimize:true,allowMinimize:false,allowMaximize:true});this.getPkgSettingsWin().setSpace(300,400,100,250);this.getPkgSettingsWin().setShowStatusbar(true);this.getParent()._addToWorkspace(this.getPkgSettingsWin());var at1=new qx.ui.basic.Atom("Enter the distinguished names of the users or groups which<br>will be granted rights by default on all new package<br> installations. Then enter the organizational unit where you<br>would >like to store package objects.","icon/22/mimetypes/package-x-generic.png");at1.setLocation(6,4);var lblMemberDn=new qx.ui.basic.Atom("Default Member DN's");lblMemberDn.setHorizontalChildrenAlign("right");lblMemberDn.set({top:100,left:10});this.getPkgDefaultMemberDn().set({top:100,right:30,width:'50%'});this.getPkgDefaultMemberDn().addEventListener("input",function(e){this.getUpdateBtn().setEnabled(true);},this);var txtTip1="The distinguished name of each of the groups which are to be added by default to all new packages<br><b>Example: </b>cn=Admins,ou=Groups,ou=Administration,dc=vhf,dc=local";var tipIco1=new qx.ui.basic.Atom("","icon/16/apps/accessories-tip.png");tipIco1.set({top:100,right:10});var tooltipBtn1=new qx.ui.basic.Atom(txtTip1);var tt1=new qx.ui.popup.ToolTip(txtTip1);tipIco1.setToolTip(tt1);var lblOuDn=new qx.ui.basic.Atom("Packages OU DN");lblOuDn.setHorizontalChildrenAlign("right");lblOuDn.set({top:125,left:10});this.getPkgOuDn().set({top:125,right:30,width:'50%'});this.getPkgOuDn().addEventListener("input",function(e){this.getUpdateBtn().setEnabled(true);},this);var txtTip2="The distinguished name of each of the groups which are to be added by default to all new packages<br><b>Example: </b>cn=Admins,ou=Groups,ou=Administration,dc=vhf,dc=local";var tipIco2=new qx.ui.basic.Atom("","icon/16/apps/accessories-tip.png");tipIco2.set({top:125,right:10});var tooltipBtn2=new qx.ui.basic.Atom(txtTip2);var tt2=new qx.ui.popup.ToolTip(txtTip2);tipIco2.setToolTip(tt2);this.getUpdateBtn().set({bottom:10,right:10});this.getUpdateBtn().addEventListener("execute",function(e){this.__updateConfigs(this.getPkgDefaultMemberDn().getValue(),this.getPkgOuDn().getValue());},this);this.getPkgSettingsWin().add(at1);this.getPkgSettingsWin().add(lblMemberDn,this.getPkgDefaultMemberDn(),tipIco1);this.getPkgSettingsWin().add(lblOuDn,this.getPkgOuDn(),tipIco2);this.getPkgSettingsWin().add(this.getUpdateBtn());this.getPkgSettingsWin().open();this.__getConfigs();},__updateConfigs:function(memberDn,ouDn){this.getPkgSettingsWin().setStatus("Updating configuration "+name+"...");var callback=qx.lang.Function.bind(this.__updateConfigsHandler,this);this.getParent()._callAsyncRpc(callback,"core.rpc.ui.Settings","updatePackageConfigs",memberDn,ouDn);},__updateConfigsHandler:function(result,ex,id){if(ex!=null){this.getPkgSettingsWin().setStatus("Ready");this.getParent()._showAlertDialog("error",ex.toString(),"RPC Failure",null);return;}if(result){this.getPkgSettingsWin().setStatus("Ready");this.getUpdateBtn().setEnabled(false);this.getPkgSettingsWin().close();}},__getConfigs:function(){var callback=qx.lang.Function.bind(this.__getConfigsHandler,this);this.getParent()._callAsyncRpc(callback,"core.rpc.ui.Settings","getPackageConfigs",null);},__getConfigsHandler:function(result,ex,id){if(ex!=null){this.getParent()._showAlertDialog("error",ex.toString(),"RPC Failure",null);return;}if(result){for(var i=0;i<result.length;i++){switch(result[i].name){case "PACKAGE_DEFAULT_MEMBER_DN":this.getPkgDefaultMemberDn().setValue(result[i].value);break;case "PACKAGE_OU_DN":this.getPkgOuDn().setValue(result[i].value);break;}}}this.getUpdateBtn().setEnabled(false);},close:function(){this.base(arguments);},terminate:function(){this.base(arguments);}}});