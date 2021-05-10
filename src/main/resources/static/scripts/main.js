var employeeApi = Vue.resource('/employee{/surname}')
var companyApi = Vue.resource('/company{/name}')
var actApi = Vue.resource('/act{/name}')
var outputApi = Vue.resource('/output{/id}')

function getIndex(list, id){
    for(var i = 0; i < list.length; i++){
        if(list[i].id === id){
            return i
        }
    }
    return -1
}

Vue.component('employees-form',{
    props: ['employees', 'socialNetworks', 'acts', 'companys', 'messageAttr'],
    data: function (){
        return{
            surname: '',
            firstname: '',
            position: '',
            nameOfCompany: '',
            nameOfAction: '',
            nameOfSocialNetwork: ''
        }
    },
    watch:{
      messageAttr: function(newVal, oldVal){
          this.name = newVal.name
          this.id  = newVal.id
      }
    },
   template:'<div>' +
       '<input type="text" placeholder="Введите фамилию" v-model="surname"/>'+
       '<input type="text" placeholder="Введите имя" v-model="firstname"/>'+
       '<input type="text" placeholder="Введите должность" v-model="position"/>'+
       '<input type="text" placeholder="Введите название компании" v-model="nameOfCompany"/>'+
       '<input type="text" placeholder="Введите название действия" v-model="nameOfAction"/>'+
       '<input type="text" placeholder="Введите название социальной сети" v-model="nameOfSocialNetwork"/>'+
       '<input type="button" value="Сохранить" v-on:click="save"/>' +
       '</div>',

    methods:{
        save: function (){
            var employee = {surname : this.surname, firstname: this.firstname, position: this.position,
                nameOfSocialNetwork: this.nameOfSocialNetwork, nameOfAction: this.nameOfAction, nameOfCompany: this.nameOfCompany};
            if(this.id){
                employeeApi.update({id:this.id}, message).then(result=>result.json().then(data=> {
                    var index = getIndex(this.messages, data.id)
                    this.messages.splice(index, 1, data)
                    this.name = ''
                    this.id = ''
                }))
            }
            else{
                employeeApi.save({}, employee).then(result=>result.json().then(data=>{
                    this.employees.push(data)
                    this.surname = ''
                    this.firstname = ''
                    this.position = ''
                    this.nameOfCompany = ''
                    this.nameOfAction = ''
                    this.nameOfSocialNetwork = ''
                }))
            }
        }
    }
});

Vue.component('employee-row',{
    props: ['employee', 'editMethod', 'employees'],
    template: '<div>' +
        'Фамилия: {{employee.surname}},' + ' Имя: {{employee.firstname}},' + ' Должность: {{employee.position}},' + ' Компания: {{employee.nameOfCompany}},'
        + ' Социальная сеть: {{employee.nameOfSocialNetwork}},' + ' Действие: {{employee.nameOfAction}}' +
        '<span style="position: absolute; right: 0">' +
        '<input type="button" value="Изменить" @click="edit"/>'+
        '<input type="button" value="X" @click="del"/>'+
        '</span>'+
        '</div>',
    methods:{
        edit: function (){
            this.editMethod(this.employee)
        },
        del: function () {
            employeeApi.remove({surname: this.employee.surname}).then(result=>{
                if(result.ok){
                    //this.messages.splice(this.messages.indexOf(this.message), 1)
                }
            })
        }
    }
});

Vue.component('employees-list', {
    props:['employees', 'socialNetworks', 'acts', 'companys'],
    data: function (){
        return {
            message: null
        }
    },
    template: '<div style="position: relative; width: 1100px"> ' +
        '<employees-form :employees="employees" :messageAttr="employees" :socialNetworks="socialNetworks" :acts="acts" companys="companys"/>' +
        '<employee-row v-for="employee in employees" :employee="employee" :editMethod="editMethod" :employees="employees"/>' +
        '</div>',
    methods:{
        editMethod: function (message){
            this.message = message
        }
    }
});

Vue.component('companys-form', {
    props: ['companys'],
    data: function (){
        return{
            name: '',
            address: ''
        }
    },
    template: '<div>' +
        '<input type="text" placeholder="Введите название компании" v-model="name"/>'+
        '<input type="text" placeholder="Введите адрес компании" v-model="address"/>'+
        '<input type="button" value="Сохранить" v-on:click="save"/>' +
        '</div>',

    methods: {
        save: function () {
            var company = {name: this.name, address: this.address};
            if (this.id) {
                employeeApi.update({id: this.id}, message).then(result => result.json().then(data => {
                    var index = getIndex(this.messages, data.id)
                    this.messages.splice(index, 1, data)
                    this.name = ''
                    this.id = ''
                }))
            } else {
                companyApi.save({}, company).then(result => result.json().then(data => {
                    this.companys.push(data)
                    this.name = ''
                    this.address = ''
                }))
            }
        }
    }
});

Vue.component('company-row',{
    props: ['company', 'editMethod', 'companys'],
    template: '<div>' +
        '{{company.name}} ' + '{{company.address}} ' +
        '<span style="position: absolute; right: 0">' +
        '<input type="button" value="Изменить" @click="edit"/>'+
        '<input type="button" value="X" @click="del"/>'+
        '</span>'+
        '</div>',
    methods:{
        edit: function (){
            this.editMethod(this.employee)
        },
        del: function () {
            companyApi.remove({surname: this.companys.name}).then(result=>{
                if(result.ok){
                    //this.messages.splice(this.messages.indexOf(this.message), 1)
                }
            })
        }
    }
});

Vue.component('companys-list',{
    props:['companys'],
    template: '<div style="position: relative; width: 1100px"> ' +
        '<companys-form :companys="companys"/>' +
        '<company-row v-for="company in companys" :company="company" :companys="companys"/>' +
        '</div>',

});

Vue.component('acts-form', {
    props: ['acts'],
    data: function (){
        return{
            name: '',
            core: '',
            time: ''
        }
    },
    template: '<div>' +
        '<input type="text" placeholder="Введите название действия" v-model="name"/>'+
        //'<input type="text" placeholder="Введите описание действия" v-model="core"/>'+
        '<input type="text" placeholder="Введите время(в секундах) на выполнение" v-model="time"/>'+
        '<input type="button" value="Сохранить" v-on:click="save"/>' +
        '</div>',

    methods: {
        save: function () {
            var company = {name: this.name, core: this.core, time:this.time};
            if (this.id) {
                employeeApi.update({id: this.id}, message).then(result => result.json().then(data => {
                    var index = getIndex(this.messages, data.id)
                    this.messages.splice(index, 1, data)
                    this.name = ''
                    this.id = ''
                }))
            } else {
                actApi.save({}, company).then(result => result.json().then(data => {
                    this.acts.push(data)
                    this.name = ''
                    this.core = ''
                    this.time =  ''
                }))
            }
        }
    }
});

Vue.component('act-row',{
    props: ['act', 'editMethod', 'acts'],
    template: '<div>' +
        '{{act.name}} ' + '{{act.core}} ' + '{{act.time}} ' +
        '<span style="position: absolute; right: 0">' +
        '<input type="button" value="Изменить" @click="edit"/>'+
        '<input type="button" value="X" @click="del"/>'+
        '</span>'+
        '</div>',
    methods:{
        edit: function (){
            this.editMethod(this.employee)
        },
        del: function () {
            actApi.remove({surname: this.acts.name}).then(result=>{
                if(result.ok){
                    //this.messages.splice(this.messages.indexOf(this.message), 1)
                }
            })
        }
    }
});

Vue.component('acts-list',{
    props:['acts'],
    template: '<div style="position: relative; width: 1100px"> ' +
        '<acts-form :acts="acts"/>' +
        '<act-row v-for="act in acts" :act="act" :acts="acts"/>' +
        '</div>',

});

Vue.component('persent-calculator', {
    data: function (){
        return {
            percent: 0,
            result: 0,
            number: 0
        }},
    template: '<div>' +
        '<input type="text" placeholder="Введите проценты" v-model="percent"/>'+
        ' % от числа ' +
        '<input type="text" placeholder="Введите число" v-model="number"/>' +
        ' = {{result}} ' +
        '<input type="button" value="Расчитать" @click="result=(percent * number)/100"/>' +
        '</div>'
})

Vue.component('adversiting-article',{
    template: '<div>Написание рекламной статьи:<p><textarea cols="60" rows="8"></textarea></p></div>'
})

Vue.component('analyzer', {
    data:{
        function(){
            return{
                surname: ''
            }
        }
    },
    template: '<p>' +
        '<input type="text" placeholder="Введите фамилию анализируемого сотрудника" v-model="surname"/>' +
        '<input type="button" value="Проанализировать" @click="analyze"/>' +
        '</p>',
    methods: {
        analyze: function (){

        }
    }
})

var app = new Vue({
    el: '#app',
    template: '<div>' +
            '<div v-if="!profile" style="border-style: dotted; width: 360px">Для входа необходимо авторизоваться через <a href="/login">Google</a></div>' +
            '<div v-else>' +
                '<div>{{profile.name}}&nbsp;<a href="/logout">Выйти</a> </div>' +
                '<employees-list :employees = "employees" :socialNetworks="socialNetworks" :acts="acts" companys="companys"/>' +
                '<companys-list :companys = "companys"/>' +
                '<acts-list :acts = "acts"/>' +
                '<persent-calculator/>' +
                '<analyzer/>' +
                '<adversiting-article/>' +
            '</div>' +
        '</div>',
    data: {
        profile: frontendData.profile,
        acts: frontendData.acts,
        articles: frontendData.articles,
        companys: frontendData.companys,
        employees: frontendData.employees,
        outputs: frontendData.outputs,
        socialNetworks: frontendData.socialNetworks
    },
    created: function (){
//        messageApi.get().then(result=>result.json().then(
//            data=>data.forEach(message => this.messages.push(message))
//        ))
    },
});