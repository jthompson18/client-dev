# client-dev

This project requires node.
To run locally install node and run the following commands:

- `npm install`
- `npm run build`

One of the libraries we are using has a bug related to commonJS require style. 
To fix the issue line 53  in /node-modules/react-d3-core/lib/index.js 

- `require('../css/axis.css');`

needs to be removed
the corrisponding css file has been added to this projects /css directory and is loaded
in the index.html file.