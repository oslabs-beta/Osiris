const componentRender = (component) => {
    const {
        state,
      children,
      title,
      props,
    } = component;
  
    if (stateful) {
      return `
        import React, { Component } from 'react';

        ${children.map(child => `import ${child.title} from './${child.title}.jsx'`).join('\n')}
  
        class ${title} extends Component {
        constructor(props) {
          super(props);
          this.state = {};
        }
        render() {
          const { ${props.map(p => `${p.key}`).join(', ')} } = this.props;
          return (
            <div>
            ${children.map(child => `<${child.title} ${child.props.map(prop => `${prop.key}={${prop.value}}`).join(' ')}/>`).join('\n')}
            </div>
          )
          }
        }
  
  
        export default ${title};
      `;
    }
  
    return `
      import React from 'react';
      ${children.map(child => `import ${child.title} from './${child.title}.jsx'`).join('\n')}
      
      const ${title} = props => (
          <div>
          ${children.map(child => `<${child.title} ${child.props.map(prop => `${prop.key}={${prop.value}}`).join(' ')}/>`).join('\n')}
          </div>
          );
          
          
          export default ${title};
          `;
        };
        
export default componentRender;

import PropTypes from 'prop-types';

//   import PropTypes from 'prop-types';
// ${title}.propTypes = {
//     ${props.map(p => `${p.key}: PropTypes.${p.type}${p.required ? '.isRequired' : ''},`).join('\n')}
//   }
//   ${title}.propTypes = {
//     ${props.map(p => `${p.key}: PropTypes.${p.type}${p.required ? '.isRequired' : ''},`).join('\n')}
//   }
