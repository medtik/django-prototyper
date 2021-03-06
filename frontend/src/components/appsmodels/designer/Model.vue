<template>
    <div @mouseover="expand" 
         @mouseout="shrink" 

         :class="{active:active, external:app.external}"
         :style="css_styles">


            <div v-show="active" class="dropdown float-right" :class="{show:show_menu}" v-click-outside="hide_menu">
                <button @click="show_menu=true" class="btn btn-sm btn-link dropdown-toggle" type="button"></button>
                <div class="dropdown-menu" :class="{show:show_menu}">
                    <router-link :to="{name: 'model', params: {app: app.name, model:model.name}}" class="dropdown-item" href="#">Edit</router-link>
                    <a @click="delete_model" class="dropdown-item" href="#">Delete</a>
                </div>
            </div>

            <div v-show="show_app_name" class="badge model-app" :style="css_styles">{{ app.name }}</div>
            
            <span v-if="app.external" class="model-name">{{ model.name }}</span>
            <router-link v-else 
                :to="{name: 'model', params: {app: app.name, model:model.name}}" class="model-name" href="#">{{ model.name }}</router-link>
            
            
            <table style="width: 100%;">
                <tr v-for="(field, n) in model.fields" v-show="n < 5 || active">
                    <td>{{field.name}}</td>
                    <td v-show="active" class="text-right">{{field.type[0]}}</td>
                </tr>
            </table>
            <small v-show="!active && model.fields.length > 5" class="text-muted">(+{{model.fields.length - 5}}) ...</small>


            <pattern-input 
                v-show="active"
                @save="add_field"
                placeholder="Type field..."
                btnlabel="+"
                class="mb-1"
                style="width: 140px;"
                :small="true"
                :regExp="/^[a-z]([a-z0-9_]*[a-z0-9])?$/i">
            </pattern-input>
    </div>

</template>

<script>

import { store } from '../../../store'
import PatternInput from '../../utils/PatternInput'
import lightness from 'lightness'
import {get_some_color} from './colors'

export default {
    name: 'model',

    props: {
        model: {required: true, type: Object},
        app:   {required: true, type: Object},
    },
    
    data() {
        return {
            active: false,
            show_app_name: false,
            show_menu: false,
        }
    },

    computed: {
        z_index() {
            return this.active ? 100 : 1;
        },
        app_color() {
            if (this.app.ui_color == undefined) {
                this.$set(this.app, 'ui_color', get_some_color(this.app.external))
            }
            return this.app.ui_color
        },
        css_styles() {
            return {
                'background-color': this.app_color,
                'border': '1px solid ' + lightness(this.app_color, -10)
            }
        }
    },

    methods: {
        expand() {
            if (!this.app.external)
                this.active = true
            this.show_app_name = true
        },
        shrink() {
            this.active = false
            this.show_app_name = false
        },
        add_field(name) {
            if (store.fields_get(this.model, name) !== undefined) {
                alert(`Field "${name}" already exist.`)
                return
            }
            store.fields_add(this.model.fields, name)
        },
        delete_model() {
            store.models_delete(this.app.name, this.model.name)
        },
        hide_menu() {
            this.show_menu = false
        },

    },
    components: {
        PatternInput,
    }
}

</script>

<style>
    .model-app {
        position: absolute; 
        top: -20px; 
        left: 0; 
        font-weight: normal;
    }
    .model-name {
        color: #333; 
        font-weight: bold;
    }
    .external {
        opacity: 0.7 !important;
        border-style: dashed !important;
    }
</style>


