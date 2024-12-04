function encodeText() {
  var textToEncode = document.getElementById('text_input').value;
  var selectedEncoding = document.getElementById('encoding_select').value;
  var result = '';

  switch (selectedEncoding) {
    case 'base64':
    result = btoa(textToEncode);
    break;
    
    case 'utf-8':
      function utf8Encode(str) {
        return Array.from(str)
          .map(char => {
          // 各文字をUTF-8エンコードしてバイト列を取得
          const utf8Bytes = new TextEncoder().encode(char);
          // 各バイトを`%XX`形式に変換
          return Array.from(utf8Bytes)
            .map(byte => '%' + byte.toString(16).toUpperCase())
            .join('');
          })
          .join('');
      }
      result = utf8Encode(textToEncode);
      break;
    
    case 'utf-16':
      // 文字列を\uXXXX形式にエンコード
      function encodeToUnicodeEscape(str) {
        let encoded_utf_16 = '';
        for (let i = 0; i < str.length; i++) {
          const code_utf_16 = str.charCodeAt(i).toString(16).padStart(4, '0');
          encoded_utf_16 += '\\u' + code_utf_16;
        }
        return encoded_utf_16;
      }
      result = encodeToUnicodeEscape(textToEncode);
    break;
      
    /*
    case 'shift_jis':
    break;
    */
    default:
      result = 'Invalid encoding selected.';
      break;
  }

  document.getElementById('result_output').value = result;
}

function decodeText() {
  var encodedText = document.getElementById('result_output').value;
  var selectedEncoding = document.getElementById('encoding_select').value;
  var result = '';

  switch (selectedEncoding) {
    case 'base64':
      result = atob(encodedText);
      break;
    
    case 'utf-8':
      result = decodeURIComponent(encodedText);
      break;
    
    case 'utf-16':
      // \uXXXX形式の文字列をデコード
      function decodeFromUnicodeEscape(str) {
        return str.replace(/\\u([0-9a-fA-F]{4})/g, (match, code) => {
          return String.fromCharCode(parseInt(code, 16));
        });
      }
      result = decodeFromUnicodeEscape(encodedText);
      break;

    /*
    case 'shift_jis':
      break;
    */
    default:
      result = 'Invalid encoding selected.';
      break;
  }

  document.getElementById('text_input').value = result;
}

function ChangeEncoding() {
    var selectedEncoding = document.getElementById('encoding_select').value;
    const url = new URL(window.location.href); 
    let params = new URLSearchParams(url.search);
    params.set('method', encodeURIComponent(selectedEncoding)); // エンコーディングを更新
    url.search = params.toString(); // URLのクエリ部分を更新
    window.history.replaceState({}, '', url.toString()); // URLを変更 (履歴を追加しない)
}

const url = new URL(window.location.href); // 現在のURLを取得
let params = new URLSearchParams(url.search);
// 特定のパラメータを取得
var method = params.get('method');
if(params.has('method')==false){
  method = "utf-8"
}
document.getElementById("encoding_select").value = method
