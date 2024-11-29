/*
  const encoder = new TextEncoder('utf-16');
  const encoded = encoder.encode('こんにちは');

  // デコード
  const decoder = new TextDecoder('utf-16');
  const decoded = decoder.decode(encoded);
*/
function encodeText() {
  var textToEncode = document.getElementById('text_input').value;
  var selectedEncoding = document.getElementById('encoding_select').value;
  var result = '';

  switch (selectedEncoding) {
    case 'base64':
    result = btoa(textToEncode);
    break;
    
    case 'utf-8':
      result = encodeURIComponent(textToEncode);
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

const url = new URL(window.location.href); // 現在のURLを取得
const params = url.searchParams; 
// 特定のパラメータを取得
var method = params.get('method');
if(params.has('method')==false){
  method = "utf-8"
}
document.getElementById("encoding_select").value = method
