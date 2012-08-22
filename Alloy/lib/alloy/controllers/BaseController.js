var Alloy = require('alloy'), 
	Backbone = Alloy.Backbone,
	_ = Alloy._;

/**
 * @class Alloy.Controller
 * @extends Backbone.Events
 * The base class for Alloy controllers.
 *
 * Each controller is associated with a UI hierarchy, defined in an XML file in the
 * `views` folder. Each element in the view hierarchy is either a Titanium {@link Titanium.UI.View View}
 * or another Alloy controller, representing an Alloy widget.
 *
 */
var Controller = function() {
	var roots = [];

	this.__iamalloy = true;
	_.extend(this, Backbone.Events, {
		__views: {},
		setParent: function(parent) {
			if (parent.__iamalloy) {
				this.parent = parent.parent;
			} else {
				this.parent = parent;
			}

			for (var i = 0, l = roots.length; i < l; i++) {
				if (roots[i].__iamalloy) {
					roots[i].setParent(this.parent);
				} else {
					this.parent.add(roots[i]);
				}
			}
		},
		addTopLevelView: function(view) {
			roots.push(view);
		},

		/**
		 * @method getTopLevelViews
		 * Returns a list of the root view elements associated with this controller.
		 *
		 * @return {Array.<(Titanium.UI.View|Alloy.Controller)>}
		 */
		getTopLevelViews: function() {
			return roots;
		},

		/**
		 * @method getView
		 * Returns the specified view associated with this controller.
		 *
		 * If no `id` is specified, returns the first view.
		 *
		 * @param {String} [id] ID of the view to return.
		 * @return {Titanium.UI.View/Alloy.Controller}
		 */
		getView: function(id) {
			if (typeof id === 'undefined' || id === null) {
				return roots[0];
			}
			return this.__views[id];
		},
		/**
		 * @method getViews
		 * Returns a list of all view elements associated with this controller.
		 *
		 * @return {Array.<(Titanium.UI.View|Alloy.Controller)>}
		 */
		getViews: function() {
			return this.__views;
		}
	});
}
module.exports = Controller;
