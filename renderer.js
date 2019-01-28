new Vue({
	el: "#table",
	data() {
		return {
			keyword: '',
			data: ["SheetJS".split(""), "1234567".split("")],
			cols: [
				{name:"A", key:0},
				{name:"B", key:1},
				{name:"C", key:2},
				{name:"D", key:3},
				{name:"E", key:4},
				{name:"F", key:5},
				{name:"G", key:6},
			],
			
	}; },

	

	methods: {

		
		_change(evt) {
			const files = evt.target.files;
			if(files && files[0]) this._file(files[0]);
		},
		
		_file(file) {
			/* Boilerplate to set up FileReader */
			const reader = new FileReader();
			reader.onload = (e) => {
				/* Parse data */
				const bstr = e.target.result;
				const wb = XLSX.read(bstr, {type:'binary'});
				/* Get first worksheet */
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				/* Convert array of arrays */
				const data = XLSX.utils.sheet_to_json(ws, {header: 1, raw:"true"});
				/* Update state */
				this.data = data;
				const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:XLSX.utils.encode_col(i), key:i}));
				this.cols = make_cols(ws['!ref']);
			console.log(this.data);
			
				
			};
			reader.readAsBinaryString(file);
		}


	},

    computed: {
        items () {
            return this.keyword
                ? this.data.filter(item => item[0].includes(this.keyword))
                : this.data
        }
    }






});