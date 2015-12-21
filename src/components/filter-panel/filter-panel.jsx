import './filter-panel.scss';
import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import PeopleFilterList from './people-filter-list.jsx';
import $ from 'jquery';

export default class FilterPanel extends React.Component {

    constructor() {
        super();
        this.state = {
            panelVisible: false,
            filter: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        var filter = this._extractFilters(nextProps.people || []);
        this.setState({filter: filter});
    }

    render() {
        var content = this.state.panelVisible
            ? this._prepareFilterContent()
            : null;

        var filterButton = this.state.panelVisible
            ? null
            : (<div className="btn btn-primary filter-panel__button"
                    onClick={this._togglePanel.bind(this)}>Filter</div>);

        return (
            <TransitionGroup transitionName="slide"
                             transitionEnterTimeout={250}
                             transitionLeaveTimeout={250}>
                {filterButton}
                {content}
            </TransitionGroup>
        );
    }


    _prepareFilterContent() {
        return (
            <div key="panel" className="container-fluid filter-panel">
                <div className="row">
                    <div className="col-sm-12 text-right u-p">
                        <div className="btn btn-default" onClick={this._togglePanel.bind(this)}>Cancel</div>
                        <div className="btn btn-primary u-m-l" onClick={this._togglePanel.bind(this)}>Apply</div>
                    </div>
                </div>

                <div className="row flex scroller">
                    <div className="col-sm-12">
                        <PeopleFilterList filter={this.state.filter}
                                          onClose={this._onFilterListClose.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }

    _extractFilters(people) {
        var props = ['location', 'level'],
            filter = {};

        _.each(props, p=> {
            filter[p] = _.chain(people)
                .pluck(p)
                .unique()
                .reduce((agg, p)=> {
                    agg[p] = false;
                    return agg;
                }, {})
                .value();
        });

        filter.skills = _.reduce(people, (agg, p)=> {
            _.each(p.skills, (rating, skill)=> {
                agg[skill] = agg[skill] || {min: 0, max: 0};

                var min = Math.min(rating, agg[skill].min),
                    max = Math.max(rating, agg[skill].max);

                agg[skill].min = min;
                agg[skill].max = max;
                agg[skill].value = Math.ceil((min + max) / 2);
            });

            return agg;
        }, {});

        return filter;

    }

    _togglePanel() {
        this.setState({panelVisible: !this.state.panelVisible});
        $('body').toggleClass('filter-open');
    }

    _onFilterListClose(filter) {
        console.log(filter);
    }
};

FilterPanel.defaultProps = {
    people: []
};