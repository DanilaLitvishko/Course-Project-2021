var employeeApi = Vue.resource('/employee{/surname}')
var companyApi = Vue.resource('/company{/name}')
var actApi = Vue.resource('/act{/name}')
var outputApi = Vue.resource('/output{/id}')

function isStringInList(arr, elem){
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].surname === elem) {
            return true;
        }
    }
    return false;
}

function findNameAct(employees, surname){
    act = ''
    employees.forEach(employee1 =>{
        if(employee1.surname == surname){
            act = employee1.nameOfAction
        }
    })
    return act
}

function find(acts, surname){
    console.log()
    let number = 0;
    acts.forEach(act => {
        console.log(act.name + ' ' +  surname)
        if(act.name == surname){
            number += act.time
            console.log('number ' + number + ' time' + act.time)
        }
    })
    return number
}

Vue.component('employees-form',{
    props: ['employees', 'messageAttr'],
    data: function (){
        return{
            surname1: '',
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
          this.surname1 = newVal.surname
          this.surname = newVal.surname
          this.firstname = newVal.firstname
          this.position = newVal.position
          this.nameOfCompany = newVal.nameOfCompany
          this.nameOfAction = newVal.nameOfAction
          this.nameOfSocialNetwork = newVal.nameOfSocialNetwork
      }
    },
   template:'<div class="container">' +
       '<div class="row">' +
            '<div class="col-25">Введите фамилию:</div>' +
            '<div class="col-75"><input type="text" placeholder="Введите фамилию" v-model="surname"/></div>' +
       '</div>' +
       '<div class="row">' +
            '<div class="col-25">Введите имя:</div>'+
            '<div class="col-75"><input type="text" placeholder="Введите имя" v-model="firstname"/></div>' +
       '</div>' +
       '<div class="row">' +
            '<div class="col-25">Введите должность:</div>'+
            '<div class="col-75"><input type="text" placeholder="Введите должность" v-model="position"/></div>' +
       '</div>' +
       '<div class="row">'+
            '<div class="col-25">Введите название компании:</div>' +
            '<div class="col-75"><input type="text" placeholder="Введите название компании" v-model="nameOfCompany"/></div>' +
       '</div>' +
       '<div class="row">'+
            '<div class="col-25">Введите название действия:</div>' +
            '<div class="col-75"><input type="text" placeholder="Введите название действия" v-model="nameOfAction"/></div>' +
       '</div>' +
       '<div class="row">'+
            '<div class="col-25">Введите название социальной сети:</div>' +
            '<div class="col-75"><input type="text" placeholder="Введите название социальной сети" v-model="nameOfSocialNetwork"/></div>' +
       '</div>'+
       '<input type="button" value="Сохранить" v-on:click="save" class="button"/>' +
       '</div>',

    methods:{
        save: function (){
            var employee = {surname : this.surname, firstname: this.firstname, position: this.position,
                nameOfSocialNetwork: this.nameOfSocialNetwork, nameOfAction: this.nameOfAction, nameOfCompany: this.nameOfCompany};
            console.log(isStringInList(this.employees, this.surname1))
            if(isStringInList(this.surname1, this.surname)){
                employeeApi.update({surname : this.surname              , firstname: this.firstname, position: this.position,
                    nameOfSocialNetwork: this.nameOfSocialNetwork, nameOfAction: this.nameOfAction, nameOfCompany: this.nameOfCompany}
                    , employee).then(result=>result.json().then(data=> {
                        //var index = getIndex(this.messages, data.id)
                        //this.messages.splice(index, 1, data)
                        //this.name = ''
                        //this.id = ''
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
    template: '<tr>' +
        '<td>{{employee.surname}}</td><td>{{employee.firstname}}</td><td>{{employee.position}}</td><td>{{employee.nameOfCompany}}</td>' +
        '<td>{{employee.nameOfSocialNetwork}}</td><td>{{employee.nameOfAction}}</td>' +
        '<td><input type="button" value="Изменить" @click="edit" class="button"/></td>'+
        '<td><input type="button" value="X" @click="del" class="button"/></td>'+
        '</tr>',
    methods:{
        edit: function (){
            this.editMethod(this.employee)
        },
        del: function () {
            employeeApi.remove({surname: this.employee.surname}).then(result=>{
                console.log(result)
                if(result.ok){

                }
            })
        }
    }
});

Vue.component('employees-list', {
    props:['employees', 'socialNetworks', 'acts', 'companys'],
    data: function (){
        return {
            employee: null
        }
    },
    template: '<div> ' +
        '<employees-form :employees="employees" :messageAttr="employee" :socialNetworks="socialNetworks" :acts="acts" companys="companys"/>' +
        '<table>' +
        '<tr><td>Фамилия</td><td>Имя</td><td>Должность</td><td>Компания</td><td>Социальная сеть</td><td>Действие</td><td>Изменить</td><td>Удалить</td></tr>' +
        '<employee-row v-for="employee in employees" :employee="employee" :editMethod="editMethod" :employees="employees"/>' +
        '</table>' +
        '</div>',
    methods:{
        editMethod: function (employee){
            this.employee = employee
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
    template:
        '<div class="container">' +
            '<div class="row">' +
                '<div class="col-25">Введите название компании: </div>' +
                '<div class="col-75"><input type="text" placeholder="Введите название компании" v-model="name"/></div>' +
            '</div>'+
            '<div class="row">' +
                '<div class="col-25">Введите название компании: </div>' +
                '<div class="col-75"><input type="text" placeholder="Введите адрес компании" v-model="address"/></div>'+
            '</div>' +
            '<input type="button" value="Сохранить" v-on:click="save" class="button"/>'+
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
    template: '<tr>' +
        '<td>{{company.name}}</td> ' + '<td>{{company.address}}</td>' +
        '<td><input type="button" value="Изменить" @click="edit" class="button"/></td>'+
        '<td><input type="button" value="X" @click="del" class="button"/></td>'+
        '</tr>',
    methods:{
        edit: function (){
            this.editMethod(this.employee)
        },
        del: function () {
            companyApi.remove({name: this.companys.name}).then(result=>{
                if(result.ok){
                    //this.messages.splice(this.messages.indexOf(this.message), 1)
                }
            })
        }
    }
});

Vue.component('companys-list',{
    props:['companys'],
    template: '<div> ' +
        '<companys-form :companys="companys"/>' +
        '<table>' +
        '<tr><td>Название компании</td><td>Адрес</td><td>Изменить</td><td>Удалить</td></tr>' +
        '<company-row v-for="company in companys" :company="company" :companys="companys"/>' +
        '</table>' +
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
    template: '<div class="container">' +
        '<div class="row">' +
            '<div class="col-25">Введите название действия: </div>' +
            '<div class="col-75"><input type="text" placeholder="Введите название действия" v-model="name"/></div>' +
        '</div>'+
        //'<input type="text" placeholder="Введите описание действия" v-model="core"/>'+
        '<div class="row">' +
            '<div class="col-25">Введите время(в секундах): </div>' +
            '<div class="col-75"><input type="text" placeholder="Введите время(в секундах) на выполнение" v-model="time"/></div>' +
        '</div>'+
        '<input type="button" value="Сохранить" v-on:click="save" class="button"/>' +
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
    template: '<tr>' +
        '<td>{{act.name}}</td> ' + '<td>{{act.time}}</td> ' +
        '<td><input type="button" value="Изменить" @click="edit" class="button"/></td>'+
        '<td><input type="button" value="X" @click="del" class="button"/></td>'+
        '</tr>',
    methods:{
        edit: function (){
            this.editMethod(this.employee)
        },
        del: function () {
            actApi.remove({name: this.acts.name}).then(result=>{
                if(result.ok){
                    //this.messages.splice(this.messages.indexOf(this.message), 1)
                }
            })
        }
    }
});

Vue.component('acts-list',{
    props:['acts'],
    template: '<div> ' +
        '<acts-form :acts="acts"/>' +
        '<table>' +
        '<tr><td>Название действия</td><td>Время на выполнение(в секундах)</td><td>Изменить</td><td>Удалить</td></tr>' +
        '<act-row v-for="act in acts" :act="act" :acts="acts"/>' +
        '</table>' +
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
        '<input type="button" value="Рассчитать" @click="result=(percent * number)/100" class="button"/>' +
        '</div>'
})

Vue.component('adversiting-article',{
    data: function (){
        return {
            text: '',
            article: ''
        }},
    template: '<div>' +
            'Написание рекламной статьи:<p><textarea cols="60" rows="8" v-model="article"></textarea></p>' +
            '<input type="button" value="Просмотреть" @click="text = article" class="button"/>' +
        '<div>{{text}}</div>' +
        '</div>',
})

Vue.component('text-info', {
    props:['info'],
    template: '<div>{{info}}</div>'
})

Vue.component('analyzer', {
    props: ['employees', 'acts'],
    data:{
        function(){
            return{
                inputValue:'',
                surname: '',
                output: 'HUI'
            }
        }
    },
    template: '<p>' +
        '<input type="text" placeholder="Введите фамилию анализируемого сотрудника" v-model="surname"/>' +
        '<input type="button" value="Проанализировать" @click="print" class="button"/>' +
        '<text-info :info="output"/>' +
        '</p>',
    methods:
        {
            print: function () {
                act = findNameAct(this.employees, this.surname)
                number = find(this.acts, act)
                console.log(number)
                this.output = 'sssss'
                if (number < 1000) {
                    this.output = 'Социальные сети сотрудника не мешают его работе'
                } else {
                    this.output = 'Социальные сети сотрудника мешают его работе'
                }
                console.log(this.output)
            }
        }
    }
)

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
                //'<analyzer :employees = "employees" :acts="acts"/>' +
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
});