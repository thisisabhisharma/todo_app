import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
    state: {
        test: 'Test 123..',
        profile: {
            "name": "",
            "email": "",
            "employee_id": ""
        }
        ,
        imageURL: []
    }
})