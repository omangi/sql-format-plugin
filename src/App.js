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

        let e = document.querySelectorAll('.buttonload');
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

                    <textarea className={"input"} placeholder=" Type your query here ..." name="query"
                              value={this.state.query} onChange={this.handleChange}/>

                    <br/>
                    <br/>
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

                    <button style={{display: this.state.result ? 'block' : 'none'}}
                            onClick={() => {
                                navigator.clipboard.writeText(this.state.simpleResult)
                            }}
                            className="buttonload">
                        <i className="fa fa-clipboard" aria-hidden="true" title={"copy to clipboard"}></i>

                    </button>
                </fieldset>

                <br/>
                <a target="_blanck" href="https://linksdev.tech/mysql">
                    <div className="test">
                        <span className="test-span">
                            <svg className="svg-inline--fa fa-whatsapp fa-w-14" aria-hidden="true" data-prefix="fab"
                                 data-icon="whatsapp" role="img" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 448 512" data-fa-i2svg=""><path
                                fill="currentColor"
                                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                            </svg>
                            WhatsApp Alerts
                        </span>

                        <br/>
                        <br/>

                        <span className="learn-more">
                            Stay Update with <b>Database</b> News - Click to Learn
                        </span>
                    </div>
                </a>

            </div>
        );
    }
}

export default App;
