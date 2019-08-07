import React from 'react';

const TABS = {
    ALLTYPES: 'All Types',
    DOCTORS: 'Doctors',
    PLACES: 'Places',
    DRUGS: 'Drugs',
}

const RESULTS = 'Lobbyist,Alert,Configuration,Encroachment,Hammer,Woven,Cannibal,Failure,Stroll,Headway,Receptionist,Pedagogy,Antique,Eighteenth-century,Skid,Board,Conform,Evacuate,Unconcerned,Nationalist,High-stakes,Signatory,Pleasure,Palpable,Post,Repudiation,Satellite,Faint,Sturgeon,Subordinate,Translator,Shredded,Amazement,Motion,Espionage,Empathetic,Parable,Bet,Assessment,Gong,Sport'.split(',');
function resGenerator() {
return RESULTS.filter((el, index) => {
    if(Math.floor(Math.random()*300) < RESULTS.length) {
        return true;
    }
    return false;
})
}


class Dropdown extends React.Component {

    state = {
        search: '',
        selectedItem: '',
        selectedTab: TABS.ALLTYPES,
        dropDownActive: false,
        results: resGenerator(),
        allTabs: Object.keys(TABS),
    }

    handleWindowClick = (e) => {
        if(!this.state.selectedItem) {
            this.resetState();
        } else {
            this.setState({
                dropDownActive: false
            })
        }

    }

    componentDidMount() {
        window.addEventListener('click', this.handleWindowClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleWindowClick);
    }

    handleTabChange = (tab) => {
        this.setState({ 
            selectedTab: TABS[tab],
            results: resGenerator(),
         })
    }

    handleSearchBarChange = (e) => {
        this.setState({ 
            search: e.target.value
         })
    }

    handleBubbling = (e) => {
        e.stopPropagation();
    }

    createDropdownItems = (acc, item) => {
        const reg = new RegExp(this.state.search, 'i')
        if(reg.test(item)) {
            acc.push(
                <li onClick={() => {this.selectItem(item)}} className="dropdown-results-li">{item.replace(reg, `<b>${escape(this.state.search)}</b>`)}</li>
            )
        }

        return acc;
    }

    generateResults = () => {
        if(this.state.search === '') {
            return this.state.results.map((res) => <li onClick={() => {this.selectItem(res)}} key={res} className="dropdown-results-li">{res}</li>)
        }

        return this.state.results.reduce(this.createDropdownItems, [])
    }

    handleSearchBarBlur = (e) => {
        console.log(e.target);
    }

    resetState = () => {
        this.setState({
            search: '',
            selectedItem: '',
            dropDownActive: false,
        })
    }

    clearSearchBar = () => {
        this.setState({
            search: '',
            selectedItem: '',
        })
    }

    selectItem = (item) => {
        this.setState({
            selectedItem: item,
            search: item,
            dropDownActive: false,
        })
    }

    toggleDropDown = () => {
        if(!this.state.dropDownActive) {
            this.setState({
                dropDownActive: true,
            })
        }
    }
    render() {
       return (
           <div onClick={this.handleBubbling} className="dropdown-wrapper">
           <div className="dropdown-input-container">
           <input 
                onChange={this.handleSearchBarChange}
                onFocus={this.toggleDropDown}
                value={this.state.search} 
                className="dropdown-input-field"
            />
            {this.state.search !== '' && <button className="dropdown-reset-button" onClick={this.resetState}>X</button>}
           </div>
        
           { <div className={`dropdown-content-container ${this.state.dropDownActive ? 'visible': 'hidden'}`}>
            <nav className="dropdown-nav">
                { this.state.allTabs.map((tab)=> {
                    if(TABS[tab] === this.state.selectedTab) {
                        return <span key={tab} className="dropdown-nav-tab--active">
                        {TABS[tab]}
                         </span>
                    }
                    return <span key={tab} className="dropdown-nav-tab" onClick={() => { this.handleTabChange(tab) }}>{TABS[tab]}</span>
                }) }
            </nav>

            <div className="dropdown-results-container">
            <ul className="dropdown-results-ul">
                    { this.generateResults() }
                </ul>
            </div>
           </div>}
           </div>
       )
    }
}

export default Dropdown;