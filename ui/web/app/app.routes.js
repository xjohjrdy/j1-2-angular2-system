"use strict";
var index_1 = require('./login/index');
var index_2 = require('./home/index');
exports.routes = [
    { path: 'login', component: index_1.LoginComponent }
].concat(index_2.HomeRoutes, [
    { path: '**', redirectTo: '' }
]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxzQkFBOEIsZUFBZSxDQUFDLENBQUE7QUFDOUMsc0JBQTJCLGNBQWMsQ0FBQyxDQUFBO0FBQzdCLGNBQU0sR0FBVztJQUM1QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLHNCQUFjLEVBQUU7U0FDekMsa0JBQVU7SUFDYixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRTtFQUUvQixDQUFDIiwiZmlsZSI6ImFwcC9hcHAucm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50fSBmcm9tICcuL2xvZ2luL2luZGV4JztcbmltcG9ydCB7IEhvbWVSb3V0ZXMgfSBmcm9tICcuL2hvbWUvaW5kZXgnO1xuZXhwb3J0IGNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICB7IHBhdGg6ICdsb2dpbicsIGNvbXBvbmVudDogTG9naW5Db21wb25lbnQgfSxcbiAgLi4uSG9tZVJvdXRlcyxcbiAgeyBwYXRoOiAnKionLCByZWRpcmVjdFRvOiAnJyB9XG5cbl07XG4iXX0=
