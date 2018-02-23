
// import React from 'react';
// import { Ajax } from 'hope-core';

// export default function( Element ) {

//   class NewElement extends React.Component {

//     constructor( props ) {
//       super( props );
//       this.state = {
//         xhrs: []
//       };
//       this.abort = this.abort.bind( this );
//     }

//     componentWillUnmount() {
//       this.abort();
//     }

//     ajax( ...opts ) {
//       const xhr = Ajax( ...opts );
//       this.state.xhrs.push( xhr );
//       return xhr;
//     }

//     abort() {
//       while ( this.state.xhrs.length ) {
//         this.state.xhrs.pop().abort();
//       }
//     }

//     render() {
//       return <Element {...this.props} ajax={this.ajax} abort={this.abort} />;
//     }
//   }


// }

