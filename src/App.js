import React from 'react';
import './App.css';
import {findAllByDisplayValue} from "@testing-library/react";

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

            delimiterRaw: '',
            delimiterSplitter: 'line_break',
            delimiterOutput: 'single_quotes',
            delimiterSeparator: 'comma',
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
        this.oneLineQuery = this.oneLineQuery.bind(this);
        this.loadTheme = this.loadTheme.bind(this);

        //delimiter
        this.delimiter = this.delimiter.bind(this);
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
            this.setState({theme: 'dark'});
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
        console.log(e)
        for (let i = 0; i <= legend.length; i++) {
            e[i].classList.add(buttonLoadClass);
        }

        let results = document.querySelectorAll('.result')
        for (let i = 0; i < results.length; i++) {
            results[i].classList.add(resultClass);
        }
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

    changeTab(e) {
        e.preventDefault();

        let cityName = e.target.innerHTML

        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        e.currentTarget.className += " active";
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

    delimiter(e) {
        e.preventDefault();

        this.setState({load: 'fa fa-refresh fa-spin'});

        let splitter = "\n"
        switch (this.state.delimiterOutput) {
            case "tab":
                splitter = "\t"
                break;
        }

        let separator = ","
        switch (this.state.delimiterSeparator) {
            case "pipe":
                separator = "|"
                break;
        }

        let quote = "";
        switch (this.state.delimiterOutput) {
            case "single_quotes":
                quote = "\'"
                break

            case "double_quotes":
                quote = "\""
                break
            default:
                quote = "";
                break
        }

        let query = this.state.delimiterRaw.trim().split(splitter);

        let test = query.filter(function(v){return v!==''}).join(quote + separator + quote);
        test = quote + test + quote

        this.setState({
            delimiterResult: test
        });

        this.setState({load: null});

    }

    addSeparator(query, separator, quote) {
        query.filter(function(v){return v!==''}).join(quote + separator + quote);
        let csvValue = quote + csvValue + quote;
    }

    render() {
        return (
            <div className="App">
                {/*<div className="tab" style={{ display: "none"}}>*/}
                {/*    <button className="tablinks" onClick={this.changeTab}>Format</button>*/}
                {/*    <button className="tablinks" onClick={this.changeTab}>Delimiter</button>*/}
                {/*</div>*/}

                <div id="Format" style={{display: 'block'}}>
                    <br/>
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

                        <pre className={"result"}>
                            <div dangerouslySetInnerHTML={{__html: this.state.result}}>
                            </div>
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
                </div>

                <div id="Delimiter" style={{display: 'none'}} >
                    <br/>
                    <b>Splitter:</b>
                    <input type="radio" id="line_break" name="delimiterSplitter"
                           value="line_break"
                           onChange={this.handleChange} checked={this.state.delimiterSplitter === "line_break"}/>
                    <label htmlFor={"carriage_return"}>Line Break (\n)</label>

                    <br/>
                    <b>Output:</b>
                    <input type="radio" id="none" name="delimiterOutput" value="none"
                           onChange={this.handleChange}/>
                    <label htmlFor={"none"}>None</label>

                    <input type="radio" id="single_quotes" name="delimiterOutput" value="single_quotes"
                           onChange={this.handleChange}/>
                    <label htmlFor={"single_quotes"}>Single Quotes</label>

                    <input type="radio" id="double_quotes" name="delimiterOutput" value="double_quotes"
                           onChange={this.handleChange} />
                    <label htmlFor={"double_quotes"}>Double Quotes</label>

                    <br/>
                    <b>Delimiter:</b>
                    <input type="radio" id="comma" name="delimiterSeparator" value="comma"
                           onChange={this.handleChange} checked={this.state.delimiterSeparator === "comma"} />
                    <label htmlFor={"comma"}>Comma(,)</label>

                    <input type="radio" id="pipe" name="delimiterSeparator" value="pipe"
                           onChange={this.handleChange} checked={this.state.delimiterSeparator === "pipe"} />
                    <label htmlFor={"pipe"}>Pipe (|)</label>

                    <br/>
                    <br/>

                    <textarea rows={10} className={"input"} placeholder=" Type your input here ..." name="delimiterRaw"
                              value={this.state.delimiterRaw} onChange={this.handleChange}/>

                    <br/>
                    <br/>

                    <button className="buttonload" onClick={this.delimiter}>
                        <i className={this.state.load}></i>Convert
                    </button>

                    <br/>
                    <br/>
                    <fieldset>
                        <legend className="legend"> Result</legend>


                        <pre className={"result"}>
                            <div dangerouslySetInnerHTML={{__html: this.state.delimiterResult}}>
                            </div>
                        </pre>

                        <br/>

                        <button style={{display: this.state.delimiterResult ? 'block' : 'none'}}
                                onClick={() => {
                                    navigator.clipboard.writeText(this.state.delimiterResult)
                                }}
                                className="buttonload">
                            <i className="fa fa-clipboard" aria-hidden="true" title={"Copy to clipboard"}></i>

                        </button>
                    </fieldset>
                </div>

                <br/>
                <a target="_blanck" href="https://linksdev.tech/mysql">
                    <div className="test">
                        <span className="test-span">
                            <svg className="t2 svg-inline--fa fa-telegram-plane fa-w-14"
                                 aria-hidden="true" data-prefix="fab"
                                 data-icon="telegramx-plane" role="img"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 448 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z">
                                </path>
                            </svg>

                            Telegram Alerts
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
