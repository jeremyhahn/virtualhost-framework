/* ************************************************************************

   Copyright: Make A Byte, Inc. http://www.makeabyte.com

   License: LGPL: http://www.gnu.org/licenses/lgpl.html
            See the LICENSE file in the project's top-level directory for details.

   Author:  Jeremy Hahn
   Version: 0.1b

************************************************************************ */

qx.Class.define( "vhf.Index", {

  extend : qx.application.Gui,

  members : {

    main : function() {

          this.base( arguments );
      
          vhf.Main.getInstance().main();
    },

    close : function() {

      this.base( arguments );
    },

    terminate : function() {

      this.base( arguments );
    }
  }
});