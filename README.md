# PUBLIC_PPMI_RNA_APP

**Version 1.010**

## Install HTML (Minimum)
This page provides for installation of the PPMI RNA Portal 'public access' version. This public access version provides researchers summary level data. To minimally install this embedded application, two lines must be added to the HTML of an existing parent page. The first line is the `div` element where the app is contained and requires `id=itg_ppmi_rna_app`, and the second provides the API's URL. An example HTML page is provided in the repository.

```
<div id="itg_ppmi_rna_app" style="max-width:1500px"></div>
<script type="text/javascript"  
   src="https://cdn.jsdelivr.net/gh/USCDTG/public_ppmi_rna_app/public/ppmi-rna-public.1.010.js" 
   api="https://public.ppmi.io/pub">
</script>
```

**Functional Version:** https://public.ppmi.io

**Unit Test**  Placing the two HTML lines should allow for construction of the About Page, and use of the API. Please type `SNCA` into the gene search page and a gene description should appear.

## Optional Install Fully Contained API

### Install Prerequisites

* [Node.js](https://nodejs.org/en/download/)
* Yarn: `sudo yum install yarn` or `brew install yum` on MacOs
* [MongoDB](https://www.mongodb.com/download-center#community).
* PM2: `npm install pm2@latest -g`

**Download git and cd to directory**

```
git clone https://github.com/USCDTG/public_ppmi_rna_app
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
tar -xvf mongodb/public_ppmi_rnaseq_db.tar
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

`pm2 start public_api.js -i 4`

**Ports

Default ports are expected to be routed via proxy, such as with NGINX. Default node.js port is 3000 and mongodb is 27017. These can be altered within the `.env` file.

# Browser Support

* Chrome latest
* Firefox latest
* Opera latest
* Safari latest
* Edge latest

# Embedded Dependencies

* Vega.js  
* Jquery.js jQuery v3.2.1 
* Skeleton CSS
* lz-string.js  
* easy-autocomplete.js http://github.com/pawelczak
* Datatables https://datatables.net

![Itg logo](http://dtg.usc.edu/images/itg.png)

