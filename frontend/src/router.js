import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Admin from './components/admin'
import AdminEditor from './components/admin/Editor'
import AppsModels from './components/appsmodels'
import ModelEditor from './components/appsmodels/ModelEditor'
import Build from './components/build'
import BuildSettings from './components/buildsettings'
import Settings from './components/settings'
import Plugins from './components/plugins'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/settings/',
            name: 'settings',
            component: Settings
        },
        {
            path: '/buildsettings/',
            name: 'buildsettings',
            component: BuildSettings
        },
        {
            path: '/apps/',
            name: 'appsmodels',
            component: AppsModels
        },
        {
            path: '/apps/:app/:model',
            name: 'model',
            component: ModelEditor
        },
        {
            path: '/apps/:app/:model/:field',
            name: 'model-field',
            component: ModelEditor
        },
        {
            path: '/admin/',
            name: 'admin',
            component: Admin
        },
        {
            path: '/admin/:app/:model',
            name: 'admin-edit',
            component: AdminEditor
        },
        {
            path: '/plugins/',
            name: 'plugins',
            component: Plugins
        },
        {
            path: '/build/',
            name: 'build',
            component: Build
        },
    ]
})
