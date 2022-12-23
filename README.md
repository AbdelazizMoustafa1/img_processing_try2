Important Scripts before starting:

to install important pachages use:
npm install
to build the js: 
npm run build
to run Es-lint: 
npm run lint
to run Es-lint with fixes: 
npm run lint-fix
to run prettier: 
npm run prettier
build and run jasmine or to run tests:
npm run test
to start the server: 
npm run start
If using Windows and want to start the server and open ur default browser on 'http://localhost:3000' by one command use:
npm run startall

port 3000 was chosen. It needs to be used in localhost as
http://localhost:3000/
Instrucitons will be outputed in website and to add and Endpoint to resize images use
http://localhost:3000/api/images

Query arguments can be:
filename, height and width
filename: only jpg
encenadaport,fjord,icelandwaterfall,palmtunnel,santamonica
height and width: number > 0

Examples:
http://localhost:3000/api/images 
instructions will be given on how to start working

http://localhost:3000/api/images?filename=fjord
image will display normally withour any resizing

http://localhost:3000/api/images?filename=fjord&height=600&width=400 
http://localhost:3000/api/images?filename=fjord&width=400&height=600 
image will display normally with specified resizing and wil get cached for later - same commands

http://localhost:3000/api/images?filename=fjordheight=skdljf 
error, NaN

Please feel free to report any issues and suggestions. Enjoy :)