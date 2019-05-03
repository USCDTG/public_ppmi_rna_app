# PUBLIC
## PUBLIC_PPMI_RNA_APP

**Version 1.033**

This page provides for installation of the PPMI RNA Portal 'public access' version. This public access version provides researchers summary level data.

To minimally install this embedded application, two lines must be added to the HTML of an existing parent page. The first line is where the application is built, and the second provides the code for the application and gives the URL for the API.

Functional Version: https://dev.ppmi.io/#About

Install HTML (Minimum)
The app will built in the HTML element with "itg_ppmi_rna_app". The size and location of the app are defined by the css style paramters in line 1. Line 2 provides the location of the javascript app. The javascript app does not contain genetic data and can be made public. It can be downloaded from this github repository or can be used via the CDN. Recommendation is to test with CDN. The API location can be used, or an API can be built following the 'fully contained API' below. An example HTML page is provided in the repository.

```
<div id="itg_ppmi_rna_app" style="max-width:1500px"></div>
<script type="text/javascript"  
   src="https://cdn.jsdelivr.net/gh/uscdtg/public_ppmi_rna_app/ppmi-rna-public.1.033.js" 
   api="https://dev.ppmi.io/pub">
</script>
```

**Unit Test**
 Placing the two HTML lines should allow for construction of the About Page, and use of the API. Please type `SNCA` into the gene search page and a gene description should appear.


## Install Fully Contained API

### Install Prerequisites

* [Node.js](https://nodejs.org/en/download/)
* Yarn: `sudo yum install yarn` or `brew install yum` on MacOs
* [MongoDB](https://www.mongodb.com/download-center#community).
* PM2: `npm install pm2@latest -g`

**Download git and cd to directory**

```
git clone git@github.com:USCDTG/public_ppmi_rna_app.git
cd public_ppmi_rnaseq_db
```

**Install yarn dependencies**

`yarn install`

**Download databases**

`yarn download`

 _or_

```
mkdir -p mongodb logs db
curl -o mongodb/public_ppmi_rnaseq_db.tar https://www.ppmi.io/db/public_ppmi_rnaseq_db.tar
tar -xvf public_ppmi_rnaseq_db.tar
```

**Run Mongodb**
This is optional and one can choose an alternative location, provided mongodb is running.

`yarn mongodb`

 _or_

`mkdir -p logs db && mongod --port 27017 --dbpath db --logpath logs/mongodb.log --fork`

**Build databases in MongoDB**
For this command, you must be in ppmi_rna_app directory to work as is, housing the dump folder from above.

`yarn build`

 _or_

`mongorestore`



**Start server**

`yarn start`

For production runs, PM2 is recommended.

`pm2 start server.js -i 4`


## Browser Support

* Chrome latest
* Firefox latest
* Opera latest
* Safari latest
* Edge latest

## Embedded Dependencies

* Vega.js  
* Jquery.js jQuery v3.2.1 
* Skeleton CSS
* lz-string.js  
* easy-autocomplete.js http://github.com/pawelczak
* Datatables https://datatables.net

## Tables/Docs

PPMI2-  ├── gene_info.json  (33,840 Documents @ 608kb Each)

## Version

Version 1.03

![Itg logo](http://dtg.usc.edu/images/itg.png)

