import './App.css';
import $ from 'jquery';

function App() {
  let hasData = false;

  const getData = () => {
    $('#show-table-btn').prop('hidden', true);

    // Get results from db via NodeJS
    if (!hasData) {
      $.ajax({
        dataType: 'json',
        url: 'output.json',
        success: function(data) {
          let tbody = $('<tbody />'), tr;
          tr = $(`<tr class="table-dark" />`);
          $.each(data,function(_,object) {
              tr.append(`
                <td>
                  <div class="elements">
                    <img src=${object.image} />
                    <span>${object.name}</span>
                    <span>${object.nationality}</span>
                  </div>
                </td>
              `);
              tr.appendTo(tbody);
          });
          tbody.appendTo('#table');
        },
        error: function(error) {
          console.log(error);
        }
      });
      
      hasData = true;
      $('#hide-table-btn').prop('hidden', false);
    } else {
      $('#table-container').prop('hidden', false);
      $('#hide-table-btn').prop('hidden', false);
    }
  }

  const hideTable = () => {
    $('#table-container').prop('hidden', true);
    $('#show-table-btn').prop('hidden', false);
    $('#table-btn').prop('hidden', true);
    $('#hide-table-btn').prop('hidden', true);
  }

  return (
    <div className="App">
      <div id="title">Fighters</div>
      <div id="button-container">
        <button id='show-table-btn' onClick={getData}>Show Fighters</button>
      </div>
      <div id="table-container">
        <table id="table" className="table table-hover"></table>
      </div>
      <button id='hide-table-btn' onClick={hideTable} hidden>Hide Table</button>
    </div>
  );
}

export default App;
