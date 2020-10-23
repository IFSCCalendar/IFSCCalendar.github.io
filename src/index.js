import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'

import {
    VCALENDAR,
    VEVENT
} from 'ics-js';

$('#version').text('Version ' + VERSION);
$.getJSON('https://ifsc-egw.wavecdn.net/egw/ranking/json.php', data => {
    var cal = new VCALENDAR();
    cal.addProp('VERSION', 2)
    cal.addProp('PRODID', 'IFSC');
    data.competitions.forEach(comp => {
        var event = new VEVENT();
        event.addProp('UID');
        event.addProp('DTSTART', new Date(comp.date), {
            VALUE: 'DATE'
        });
        event.addProp('DTEND', new Date(comp.date_end), {
            VALUE: 'DATE'
        });
        event.addProp('DTSTAMP', new Date(comp.modified), {
            VALUE: 'DATE-TIME'
        });
        event.addProp('SUMMARY', comp.name);
        event.addProp('TRANSP', true);
        var desc = '';
        if (comp.info2 != undefined) desc = 'Information: ' + comp.info2 + '\\n';
        else if (comp.homepage != undefined) desc = desc + 'Homepage: ' + comp.homepage + '\\n';
        if (comp.WetId != undefined) {
            desc = desc + 'Event Page: ' + 'https://www.ifsc-climbing.org/index.php/component/ifsc/?view=event&WetId=' + comp.WetId;
            event.addProp('URL', 'https://www.ifsc-climbing.org/index.php/component/ifsc/?view=event&WetId=' + comp.WetId);
        }
        event.addProp('DESCRIPTION', desc);
        if (comp.host_nation != undefined) event.addProp('LOCATION', comp.host_nation);

        cal.addComponent(event);
    });
    var url = window.URL.createObjectURL(cal.toBlob());
    $('#btn_download').removeClass('disabled');
    $('#btn_download').attr('href', url);
    $('#btn_download').attr('download', 'ifsc.ics');
});