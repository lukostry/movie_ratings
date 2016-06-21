this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["error"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + "\">\r\n    <p><i class=\""
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\" aria-hidden=true></i> Oops, something went wrong, please try to refresh the page</p>\r\n</div>\r\n";
},"useData":true});
this["Handlebars"]["templates"]["listing"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <li class=\"movie\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n        <h3>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\r\n        <div class=\"poster_wrapper\">\r\n            <img src=\""
    + alias4(((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"poster","hash":{},"data":data}) : helper)))
    + "\">\r\n        </div>    \r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["Handlebars"]["templates"]["ratingPanel"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <button class=\"button_to_rate\" data-rating=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\"><i class=\"fa fa-star\" aria-hidden=\"true\"></i></button>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"rating_panel_wrapper\">\r\n    <div class=\"distribution\"></div>\r\n    <div class=\"buttons_container\">\r\n        <h4>You can rate this movie (1-5 stars)!</h4>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.stars : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"average\">Average user's rating: <span class=\"avg_number\"></span></div>    \r\n</div>\r\n";
},"useData":true});
this["Handlebars"]["templates"]["ratingTable"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <tr class=\"rating_row\">\r\n            <td class=\"star_counter\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</td>\r\n            <td class=\"rating_percentage_visualition\">\r\n                <div class=\"progress_bell\"></div>\r\n            </td>\r\n            <td class=\"rating_percentage_number\"></td>\r\n        </tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"rating_table\">\r\n    <tbody class=\"rating_display_container\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.stars : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\r\n</table>\r\n";
},"useData":true});
this["Handlebars"]["templates"]["success"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + "\">\r\n    <i class=\""
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\" aria-hidden=true></i>\r\n    <p>Thanks for your vote, you can rate other movies as well!</p>\r\n</div>\r\n";
},"useData":true});