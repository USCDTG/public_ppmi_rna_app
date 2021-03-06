# PUBLIC_PPMI_RNA_APP

**Version 1.2**

## Install HTML (Minimum)
This page provides for installation of the PPMI RNA Portal 'public access' version. This public access version provides researchers summary level data. To minimally install this embedded application, two `<div>` elements must be added to the HTML of an existing parent page. The first `div` is where the app is contained and requires `id=itg_ppmi_rna_app`, and the second `div` provides the API's URL. 

```
<div id="itg_ppmi_rna_app" style="max-width:1500px"></div>
<script type="text/javascript"  
   src="https://public.ppmi.io/public/ppmi-rna-public.1.2.js" 
   api="https://public.ppmi.io/pub">
</script>
```

An example HTML page is provided in the repository.

**Functional Version:** https://public.ppmi.io

**Unit Test**  Placing the two HTML lines should allow for construction of the About Page, and use of the API. Please type `SNCA` into the gene search page and a gene description should appear.

## Optional Install Fully Contained API

Installation assumes `MongoDB` is running on port 27017, generating API on port 3000, or  specified in `.env` file

1. Install Prerequisites

   [Node.js](https://nodejs.org/en/download/), [Yarn](https://yarnpkg.com/lang/en/docs/cli/install/), [MongoDB](https://www.mongodb.com/download-center#community), [PM2](https://pm2.io/doc/en/runtime/quick-start/)

2. Download git, cd to directory, and install node.js dependencies

   ```
   git clone https://github.com/USCDTG/public_ppmi_rna_app
   cd public_ppmi_rna_app
   yarn install
   ```
   
3. Download & Build MongoDB databases: `yarn mongodb`
4. Run API: `yarn start` or `pm2 start public_api.js -i 2`, where PM2 is preferred in production

# Browser Support

Compatible on 97% of browser share.
Tested on Windows 7/8/9/10; MacOS Lion+,Mavericks+; IOs8+;
Chrome 38+; Firefox 38+; Opera 25+; Safari 9+ on Yosemite; Edge 15+ on Windows 7,8,10
IE 11 not supported

# Embedded JS

Vega.js; Jquery.js jQuery v3.2.1; Skeleton CSS; lz-string.js; easy-autocomplete.js http://github.com/pawelczak; Datatables https://datatables.net

![Itg logo](http://dtg.usc.edu/images/itg.png)

