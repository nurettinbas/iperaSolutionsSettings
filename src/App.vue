<template>
  <div id="app">
    <div class="card mt-2 ml-2 mr-2 text-left" v-for="(group,key) in properties">
        <div class="card-header bg-light" style="padding: 0.01rem 0.6rem;cursor:pointer;" @click="openClose(properties[key])">
            <h5>
                <i class="fa " :class="properties[key].open ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                <span class="text-secondary">
                    {{properties[key].name}}
                </span>
             </h5>
        </div>
        <div class="card-body" v-if="properties[key].open">
            <div class="form-group row" v-for="pro in properties[key].list">
                <label class="col-md-6 font-weight-bold">{{pro.key}}</label>
                <div class="col-md-6">
                    <label v-if="pro.type == '0' ">{{pro.value}}</label>
                    <input v-if="pro.type == '1'" class="form-control" type="text" v-model="pro.value">
                    <input v-if="pro.type == '2'" class="form-control" type="number" v-model="pro.value">
                    <input v-if="pro.type == '3'" class="form-control" type="email" v-model="pro.value">
                    <input v-if="pro.type == '4'" class="form-control" type="password" v-model="pro.value">
                    <textarea v-if="pro.type == '5'" class="form-control" v-model="pro.value"></textarea>
                    <input v-if="pro.type == '6'" class="form-control" type="checkbox" v-model="pro.value">
                    <select v-if="pro.type == '7'" class="form-control" v-model="pro.value" multiple>
                        <option value="">Seçiniz</option>
                        <option v-for="day in days" :value="day.key">{{day.text}}</option>
                    </select>
                    <input v-if="pro.type == '8'" class="form-control" type="time" v-model="pro.value">
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      properties : [],
      days : [
          {key : '1', text :'Pazartesi'},
          {key : '2', text :'Salı'},
          {key : '3', text :'Çarşamba'},
          {key : '4', text :'Perşembe'},
          {key : '5', text :'Cuma'},
          {key : '6', text :'Cumaertesi'},
          {key : '7', text :'Pazar'},
      ]
    }
 },
 created : function(){
    this.load();
 },
 methods : {
      openClose : function(value){
          value.open = !value.open;
          this.$forceUpdate();
      },
      load : function(){
          axios
                .get('properties.json')
                .then(
                    (sr)=>{
                        this.properties = sr.data.data;
                        this.properties = _.map(_.groupBy(this.properties,'group_name'), (group, groupKey) => {
                           for (var pro of group){
                                if (pro.type == '7') {
                                    pro.value = pro.value.split(",");
                                }
                                if (pro.type == '6') {
                                    pro.value == '1' ? pro.value = true : pro.value = false;
                                }
                            }
                            return {
                                name : groupKey.replace(/_/g, " "),
                                list : group,
                                open : false
                            }
                        })
                    },
                    (er)=>{
                        alert('Veriler Yüklenemedi!')
                    }
                )
     }
 }
}
</script>
