# PUBLIC
## PUBLIC_PPMI_RNA_APP

**Version 1.03**

The expectation is that this portal will be implemented as an HTML/JS embedded application where a node.js RESTful JSON API provides **json** documents. To install this embedded application, two lines must be added to the HTML of an existing parent page.  

Functional Version: [https://dev.ppmi.io/#About](https://dev.ppmi.io/#About)
## Install HTML (Minimum)

Installation of the portal requires an HTML call to `ppmi-rna-private.js` application, indicating the location of the database API under the `global_api` parameter, and a `div` element where the APP will be built.  To install this embedded application, two lines must be added to the HTML of an existing parent page.  

** Add HTML Line 1**. This `itg_ppmi_rna_app` div element will house the script. 

** Add HTML Line 2**. The script is called from its public location, noting that no individual level data is retained in the script. The script needs a `api` set to the location of the JSON API serving gene-level information.  If this is not set, the app will display the `About` page, but not return gene-level data.

```
<div id="itg_ppmi_rna_app" style="max-width:1500px"></div>
<script type="text/javascript"  
   src="https://cdn.jsdelivr.net/gh/USCDTG/public_ppmi_rna_app/ppmi-rna-public.1.032.js" 
   api="https://dev.ppmi.io/private">
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

