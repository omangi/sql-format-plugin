import React from 'react';
import './App.css';

const API_FORMAT_URL = 'https://sqlformat.org/api/v1/format';

const CSS_BODY = 'body-';
const CSS_LEGEND = 'legend-';
const CSS_INPUT = 'input-';
const CSS_BUTTON_LOAD = 'buttonload-';
const CSS_RESULT = 'formatSql-';

/*global chrome*/

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: '',
            query: '',
            simpleResult: null,
            result: null,
            theme: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
        this.oneLineQuery = this.oneLineQuery.bind(this);
        this.loadTheme = this.loadTheme.bind(this);
    }

    loadTheme() {

        let self = this

        try {
            // Use default theme = 'light'
            chrome.storage.sync.get({
                theme: 'light',
            }, function (items) {
                self.setState({theme: items.theme});

            });
        } catch (e) {
            this.setState({theme: 'light'});
        }
    }

    componentDidMount() {
        this.loadTheme();

        let self = this
        window.setTimeout(function () {
            self.handleTheme()
        },500)
    }

    handleTheme() {
        let theme = this.state.theme

        const bodyClass = CSS_BODY + theme;
        const legendClass = CSS_LEGEND + theme;
        const inputClass = CSS_INPUT + theme;
        const buttonLoadClass = CSS_BUTTON_LOAD + theme;
        const resultClass = CSS_RESULT + theme;

        let  body = document.querySelector('body');
        body.classList.add(bodyClass);

        let  legend = document.querySelectorAll('.legend');
        for (let i = 0; i < legend.length; i++) {
            legend[i].classList.add(legendClass);
        }

        let e = document.querySelector('input');
        e.classList.add(inputClass);

        e = document.querySelectorAll('.buttonload');
        for (let i = 0; i < legend.length; i++) {
            e[i].classList.add(buttonLoadClass);
        }

        e = document.querySelector('#formatSql');
        e.classList.add(resultClass);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    sendQuery(e) {
        this.setState({load: 'fa fa-refresh fa-spin'});

        const formData  = new FormData();
        formData.append("reindent", 1);
        formData.append("sql", this.state.query);

        fetch(API_FORMAT_URL, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then((result) => {
            let colored = this.replaceWithColor(result.result);

            this.setState({simpleResult: result.result});
            this.setState({result: colored});
            this.setState({load: null});

        },)

        e.preventDefault();
    }

    oneLineQuery(e) {
        this.setState({load: 'fa fa-refresh fa-spin'});

        let query = this.state.query;
        query = query.replace(/\n/g, "]");
        //@todo refactor this ugly code hehe
        query = query.replace(/\ \ /g, "");
        query = query.replace(/\]/g, " ");

        let fullTextColored = query.replace(/\ \ /g, " ");
        query = this.replaceWithColor(fullTextColored);

        this.setState({simpleResult: fullTextColored});
        this.setState({result: query});
        this.setState({load: null});


        e.preventDefault();
    }

    replaceWithColor(data) {
        var reserved = [
            "add ",
            "all ",
            "alter ",
            "analyze ",
            "and ",
            "as ",
            "asc ",
            "asensitive ",
            "before ",
            "between ",
            "bigint ",
            "binary ",
            "blob ",
            "both ",
            "by ",
            "call ",
            "cascade ",
            "case ",
            "change ",
            "char ",
            "character ",
            "check ",
            "collate ",
            "column ",
            "condition ",
            "connection ",
            "constraint ",
            "continue ",
            "convert ",
            "create ",
            "cross ",
            "current_date ",
            "current_time ",
            "current_timestamp ",
            "current_user ",
            "cursor ",
            "database ",
            "databases ",
            "day_hour ",
            "day_microsecond ",
            "day_minute ",
            "day_second ",
            "dec ",
            "decimal ",
            "declare ",
            "default ",
            "delayed ",
            "delete ",
            "desc ",
            "describe ",
            "deterministic ",
            "distinct ",
            "distinctrow ",
            "div ",
            "double ",
            "drop ",
            "dual ",
            "each ",
            "else ",
            "elseif ",
            "enclosed ",
            "escaped ",
            "exists ",
            "exit ",
            "explain ",
            "false ",
            "fetch ",
            "float ",
            "for ",
            "force ",
            "foreign ",
            "from ",
            "fulltext ",
            "goto ",
            "grant ",
            "group ",
            "having ",
            "high_priority ",
            "hour_microsecond ",
            "hour_minute     ",
            "hour_second ",
            "if ",
            "ignore ",
            "in ",
            "index ",
            "infile ",
            "inner ",
            "inout ",
            "insensitive ",
            "insert ",
            "int ",
            "integer ",
            "interval ",
            "into ",
            "is ",
            "iterate ",
            "join ",
            "key ",
            "keys ",
            "kill ",
            "leading ",
            "leave ",
            "left ",
            "like ",
            "limit ",
            "lines ",
            "load ",
            "localtime ",
            "localtimestamp ",
            "lock ",
            "long ",
            "longblob ",
            "longtext ",
            "loop ",
            "low_priority ",
            "match ",
            "mediumblob ",
            "mediumint ",
            "mediumtext ",
            "middleint ",
            "minute_microsecond ",
            "minute_second ",
            "mod ",
            "modifies ",
            "natural ",
            "not ",
            "no_write_to_binlog ",
            "null ",
            "numeric ",
            "on optimize ",
            "option ",
            "optionally ",
            "or ",
            "order ",
            "out ",
            "outer ",
            "outfile ",
            "precision ",
            "primary ",
            "procedure ",
            "purge ",
            "read ",
            "reads ",
            "real ",
            "references ",
            "regexp ",
            "rename ",
            "repeat ",
            "replace ",
            "require ",
            "restrict ",
            "return ",
            "revoke ",
            "right ",
            "rlike ",
            "schema ",
            "schemas ",
            "second_microsecond ",
            "select ",
            "sensitive ",
            "separator ",
            "set ",
            "show ",
            "smallint ",
            "soname ",
            "spatia ",
            "specific ",
            "sql ",
            "sqlexception ",
            "sqlstate ",
            "sqlwarning ",
            "sql_big_result ",
            "sql_calc_found_rows ",
            "sql_small_result ",
            "ssl ",
            "starting ",
            "straight_join ",
            "table ",
            "terminated ",
            "then ",
            "tinyblob ",
            "tinyint ",
            "tinytext ",
            "to ",
            "trailing ",
            "trigger ",
            "true ",
            "undo ",
            "union ",
            "unique ",
            "unlock ",
            "unsigned ",
            "update ",
            "usage ",
            "use ",
            "using ",
            "utc_date ",
            "utc_time ",
            "utc_timestamp ",
            "values ",
            "varbinary ",
            "varchar ",
            "varcharacter ",
            "varying ",
            "when ",
            "where ",
            "while ",
            "with ",
            "write ",
            "xor ",
            "year_month ",
            "zerofil "
        ];

        var qtdReservedWord = reserved.length;

        for (let i = 0; i < qtdReservedWord; i++) {
            data = data.replace(reserved[i].toUpperCase(), "<span>"+reserved[i].toUpperCase()+"</span>");
            data = data.replace(reserved[i], "<span>"+reserved[i]+"</span>");
        }

        return data;
    }

    render() {
        return (
            <div className="App">
                <fieldset>
                    <legend className="legend"> Simple SQL ({this.state.theme})</legend>

                    <textarea className={"input"} placeholder=" Type your query here ..." name="query" value={this.state.query} onChange={this.handleChange} />

                    <br />
                    <br />
                    <button className="buttonload" onClick={this.sendQuery}>
                        <i className={this.state.load}></i>Format
                    </button>
                    &nbsp;&nbsp;
                    <button className="buttonload" onClick={this.oneLineQuery}>
                        <i className={this.state.load}></i>Compress
                    </button>
                </fieldset>

                <br/>
                <fieldset>
                    <legend className="legend"> Result</legend>

                    <pre id="formatSql">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: this.state.result
                            }}></div>
                    </pre>

                    <br/>

                    <button style={{display: this.state.result ? 'block' : 'none' }}
                            onClick={() => {navigator.clipboard.writeText(this.state.simpleResult)}}
                            className="buttonload">
                        <i className="fa fa-clipboard" aria-hidden="true" title={"copy to clipboard"}></i>

                    </button>
                </fieldset>

                <br />
                <form action="https://www.paypal.com/donate" method="post" target="_blank">
                    <input type="hidden" name="hosted_button_id" value="SR2HAUGUMDQL4" />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    <img alt="" border="0" src="https://www.paypal.com/en_BR/i/scr/pixel.gif" width="1" height="1" />
                </form>

            </div>
        );
    }
}

export default App;
