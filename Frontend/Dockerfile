FROM node:14.15.4

# set working directory
WORKDIR /frontend

# add `/frontend/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /frontend/package.json
RUN npm install
RUN npm install -g @angular/cli@11.1.1

# add app
COPY . /frontend

# start app
CMD cd frontend
CMD ng serve --host 0.0.0.0