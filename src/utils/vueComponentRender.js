
const vueComponentRender = (componentStr , selectedState, title) => {
  switch (selectedState) {
    case 'state':
      return `
      <template>
        <div>${componentStr}
        </div>
      </template>
    
      <script>
        export default {
          name: ${title},
          components: {
            
          },
          props: [],
        }
      </script> 
    
      <style>
      </style>`
    default:
      return `
      <template>
        <div>${componentStr}
        </div>
      </template>
  
      <script>
        export default {
          name: ${title},
          components: {
            
          },
        }
      </script> 
    
      <style>
      </style>`
  }
}
export default vueComponentRender;

/* <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> */
