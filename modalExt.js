/**
 * Plugin que extiende las funcionalidades de modal
 * 
 * Dependencias: jQuery, Modal
 * Date: 2016-12-14
 *  
 * @author Diego Malagón 
 * @param {Funtion} $ jQuery
 * @returns {undefined}
 */
(function($){
    var name = "modalExt";
    
    var Func = function(){
        var $modal;
        var options;
        
        /**
         * Función que inicia la funcionalidad
         * 
         * @returns {undefined}
         */
        var init = function(){
            initEventListeners();
        };
        
        /**
         * Función para asignar todos los eventos sobre la GUI
         * 
         * @returns {undefined}
         */
        var initEventListeners = function(){
            // Cierre del modal
            $modal.on('hidden.bs.modal', function () {
                setContent($("#loading-tmpl").html());
                setTitle(Translator.trans("cargando")+"...");
            });
        };
        
        /**
         * Función para abrir el modal
         * 
         * @param {String} title título del modal
         * @returns {undefined}
         */
        var open = function(title){
            // Asignar título
            setTitle(title);
            // Abrir modal
            $modal.modal(options);
        };

        /**
         * Función para cerrar el modal
         * @returns {undefined}
         */
        var close = function(){
            $modal.modal("hide");
        };

        /**
         * Función que retorna el objeto modal
         * 
         * @returns {settings.modal}
         */
        var getModal = function(){
            return $modal;
        };

        /**
         * Función para asignar contenido al modal
         * 
         * @param {string} html
         * @returns {undefined}
         */
        var setContent = function(html){
            $modal.find(".modal-body").html(html);
        };

        /**
         * Función para asignar el título al modal
         * 
         * @param {type} title
         * @returns {undefined}
         */
        var setTitle = function(title){            
            $modal.find(".modal-title").text(title);
        };
        
        return {
            init: function(element){
                $modal = $(element);
                
                init();
                
                return $modal;
            },
            open:       open,
            close:      close,
            getModal:   getModal,
            setContent: setContent,
            setTitle:   setTitle
        };
    };
    
    $.fn[name]= function(options, args){      
        var element = this;
        var Plugin = new Func();
        
        if(Plugin[options]){
            Plugin.init(element);            
            return Plugin[options](args);
        }
        else if(typeof(options) === "object" || !options){
            return Plugin.init(element);
        }
    };
    
})(jQuery);