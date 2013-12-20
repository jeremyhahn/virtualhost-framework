if(!window.qxsettings)qxsettings={};if(qxsettings["qx.version"]==undefined)qxsettings["qx.version"]="0.0";if(qxsettings["qx.isSource"]==undefined)qxsettings["qx.isSource"]=false;if(!window.qxvariants)qxvariants={};qx.Class.define("packages.core.ui.window.Preferences",{extend:vhf.Main,properties:{WireFrame:{init:vhf.Main.getInstance()},PreferencesWin:{init:new qx.ui.window.Window("Application Preferences","icon/16/apps/preferences.png")}},construct:function(){this.main();},members:{main:function(){this.getPreferencesWin().set({showMinimize:true,allowMinimize:false,allowMaximize:true});this.getPreferencesWin().setSpace(200,400,20,400);this.getPreferencesWin().setShowStatusbar(true);this.getWireFrame()._addToWorkspace(this.getPreferencesWin());var at1=new qx.ui.basic.Atom("Application Preferences","icon/22/apps/preferences.png");at1.setLocation(4,4);var tv1=new qx.ui.pageview.tabview.TabView;tv1.set({left:4,top:40,right:4,bottom:4});var t1=new qx.ui.pageview.tabview.Button("Themes","icon/16/categories/preferences-system.png");t1.setChecked(true);var t2=new qx.ui.pageview.tabview.Button("Toolbar","icon/16/categories/applications-development.png");tv1.getBar().add(t1,t2);var p1=new qx.ui.pageview.tabview.Page(t1);var p2=new qx.ui.pageview.tabview.Page(t2);tv1.getPane().add(p1,p2);var l1=new qx.ui.layout.CanvasLayout;l1.setWidth('100%');l1.setHeight('100%');p1.add(l1);qx.util.ThemeList.createIconButtons(l1,5,48);qx.util.ThemeList.createMetaButtons(l1,200,48);var ld=[];var lt=["Name","URL"];var lc={Name:{label:"Name",width:190,type:"text",sortable:true,sortProp:"text"},Url:{label:"URL",width:190,type:"text",sortable:true,sortProp:"text"}};var lv=new qx.ui.listview.ListView(ld,lc);lv.setBorder("dark-shadow");lv.setBackgroundColor("white");lv.setWidth('100%');lv.setBottom(40);lv.setLocation(0,0);for(var i=0;i<this.getWireFrame().getExternalSites().length;i++){ld.push({Name:{text:this.getWireFrame().getExternalSites()[i].name},Url:{text:this.getWireFrame().getExternalSites()[i].url}});}lv.updateSort();lv.update();var deleteBtn=new qx.ui.form.Button("Delete Site","icon/16/actions/edit-delete.png");deleteBtn.set({bottom:2,right:90,enabled:false});deleteBtn.addEventListener("execute",function(e){this.__removeSite(lv,ld,deleteBtn);},this);var addBtn=new qx.ui.form.Button("New Site","icon/16/actions/edit-add.png");addBtn.addEventListener("execute",function(e){this.__addSite(lv,ld);},this);addBtn.set({bottom:2,right:2});p2.add(lv,deleteBtn,addBtn);lv.getPane().getManager().addEventListener("changeSelection",function(e){deleteBtn.setEnabled(true);});this.getPreferencesWin().add(at1,tv1);this.getPreferencesWin().open();},__removeSite:function(lv,ld,deleteBtn){var items=lv.getPane().getManager().getItems();var selectedItems=lv.getPane().getSelectedItems();for(var i=0;i<items.length;i++){for(var j=0;j<selectedItems.length;j++){if(items[i].Name.text==selectedItems[j].Name.text){this.getPreferencesWin().setStatus("Deleting site "+selectedItems[j].Name.text+"...");var callback=qx.lang.Function.bind(this.__removeSiteHandler,this);this.getWireFrame()._callAsyncRpc(callback,"core.rpc.ui.Preferences","delete",this.getWireFrame().getUserAttribs()['dn'],items[i].Url.text);ld.splice(i,1);lv.updateSort();lv.update();if(!lv.getPane().getSelectedItem().length)deleteBtn.setEnabled(false);}}}},__removeSiteHandler:function(result,ex,id){if(ex!=null){this.getPreferencesWin().setStatus("Ready");this.getWireFrame()._showAlertDialog("error",ex.toString(),"RPC Failure",null);return;}if(result)this.getPreferencesWin().setStatus("Ready");},__addSite:function(lv,ld){var args=Array(2);args[0]=lv;args[1]=ld;this.getWireFrame()._loadPackage("packages.core.ui.window.NewToolbarButton",args);},__addSiteHandler:function(result,ex,id){if(ex!=null){this.getPreferencesWin().setStatus("Ready");this.getWireFrame()._showAlertDialog("error",ex.toString(),"RPC Failure",null);return;}if(result){this.getPreferencesWin().close();}},close:function(){this.base(arguments);},terminate:function(){this.base(arguments);}}});
