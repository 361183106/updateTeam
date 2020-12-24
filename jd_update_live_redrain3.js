const $ = new Env('直播间红包雨2');
const fs = require('fs');
const qiniu = require('qiniu')
const notify = $.isNode() ? require('./sendNotify') : '';
let bodyList = [
  'area=12_904_50647_52660&body=%7B%22liveId%22%3A%223083785%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=00e0fe152b1a4a0a197e82da8e8c8f0f&st=1608168959434&sv=100&uts=0f31TVRjBSsx5eg1K1LluXT7F3nt5fC6DLomzY/8ucR6/783kTOoEi6oEIsfodwXynL2MYEJR6jJw/uoQ7M/7scUx1GhJJEYAydJ%2B8OseTojIb40aQyeT8%2BOsRiFHfnUIfn%2BkUdaXZ8sk32cdOSDt4ifkKEZ6hqF2gqVtzf38GQpkwgM%2BElpdYI8%2BRfrDeiR4CUJNNjLJibChNliQk5qjg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=eca3570e9aa3c15b2fad65c40a87f0fb',
  'area=12_904_50647_52660&body=%7B%22liveId%22%3A%223071592%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=d18c13a76cceab6f20cbf38edfef7985&st=1608168967355&sv=122&uts=0f31TVRjBSsx5eg1K1LluXT7F3nt5fC6DLomzY/8ucR6/783kTOoEi6oEIsfodwXynL2MYEJR6jJw/uoQ7M/7scUx1GhJJEYAydJ%2B8OseTojIb40aQyeT8%2BOsRiFHfnUIfn%2BkUdaXZ8sk32cdOSDt4ifkKEZ6hqF2gqVtzf38GQpkwgM%2BElpdYI8%2BRfrDeiR4CUJNNjLJibChNliQk5qjg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=eca3570e9aa3c15b2fad65c40a87f0fb',
  'area=12_904_50647_52660&body=%7B%22liveId%22%3A%223084349%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=4ae5a072ffc894ae194f334ef8699d87&st=1608168973160&sv=112&uts=0f31TVRjBSsx5eg1K1LluXT7F3nt5fC6DLomzY/8ucR6/783kTOoEi6oEIsfodwXynL2MYEJR6jJw/uoQ7M/7scUx1GhJJEYAydJ%2B8OseTojIb40aQyeT8%2BOsRiFHfnUIfn%2BkUdaXZ8sk32cdOSDt4ifkKEZ6hqF2gqVtzf38GQpkwgM%2BElpdYI8%2BRfrDeiR4CUJNNjLJibChNliQk5qjg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=eca3570e9aa3c15b2fad65c40a87f0fb',
  'area=12_904_50647_52660&body=%7B%22liveId%22%3A%223083883%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=04431e03c72aa2d2fc25ca3d8d251db0&st=1608168978256&sv=110&uts=0f31TVRjBSsx5eg1K1LluXT7F3nt5fC6DLomzY/8ucR6/783kTOoEi6oEIsfodwXynL2MYEJR6jJw/uoQ7M/7scUx1GhJJEYAydJ%2B8OseTojIb40aQyeT8%2BOsRiFHfnUIfn%2BkUdaXZ8sk32cdOSDt4ifkKEZ6hqF2gqVtzf38GQpkwgM%2BElpdYI8%2BRfrDeiR4CUJNNjLJibChNliQk5qjg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=eca3570e9aa3c15b2fad65c40a87f0fb',
  'area=12_904_50647_52660&body=%7B%22liveId%22%3A%223003652%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=3dcb67303e3173f45d1650e5428bec4b&st=1608168981743&sv=101&uts=0f31TVRjBSsx5eg1K1LluXT7F3nt5fC6DLomzY/8ucR6/783kTOoEi6oEIsfodwXynL2MYEJR6jJw/uoQ7M/7scUx1GhJJEYAydJ%2B8OseTojIb40aQyeT8%2BOsRiFHfnUIfn%2BkUdaXZ8sk32cdOSDt4ifkKEZ6hqF2gqVtzf38GQpkwgM%2BElpdYI8%2BRfrDeiR4CUJNNjLJibChNliQk5qjg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=eca3570e9aa3c15b2fad65c40a87f0fb',
  'area=12_904_50647_52660&body=%7B%22liveId%22%3A%223077772%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=c0f197799abae93d087e21aad718704f&st=1608168986658&sv=111&uts=0f31TVRjBSsx5eg1K1LluXT7F3nt5fC6DLomzY/8ucR6/783kTOoEi6oEIsfodwXynL2MYEJR6jJw/uoQ7M/7scUx1GhJJEYAydJ%2B8OseTojIb40aQyeT8%2BOsRiFHfnUIfn%2BkUdaXZ8sk32cdOSDt4ifkKEZ6hqF2gqVtzf38GQpkwgM%2BElpdYI8%2BRfrDeiR4CUJNNjLJibChNliQk5qjg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=eca3570e9aa3c15b2fad65c40a87f0fb',
  'area=12_904_50647_52660&body=%7B%22liveId%22%3A%223084585%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=329d86b78f0a8c333c0eaedae01ad5f9&st=1608169521996&sv=111&uts=0f31TVRjBSsx5eg1K1LluXT7F3nt5fC6DLomzY/8ucR6/783kTOoEi6oEIsfodwXynL2MYEJR6jJw/uoQ7M/7scUx1GhJJEYAydJ%2B8OseTojIb40aQyeT8%2BOsRiFHfnUIfn%2BkUdaXZ8sk32cdOSDt4ifkKEZ6hqF2gqVtzf38GQpkwgM%2BElpdYI8%2BRfrDeiR4CUJNNjLJibChNliQk5qjg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=eca3570e9aa3c15b2fad65c40a87f0fb',
  'area=12_904_50647_52660&body=%7B%22liveId%22%3A%223083404%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=e5b6ca61c4628e81672e76cbe88b7cba&st=1608169848633&sv=111&uts=0f31TVRjBSsx5eg1K1LluXT7F3nt5fC6DLomzY/8ucR6/783kTOoEi6oEIsfodwXynL2MYEJR6jJw/uoQ7M/7scUx1GhJJEYAydJ%2B8OseTojIb40aQyeT8%2BOsRiFHfnUIfn%2BkUdaXZ8sk32cdOSDt4ifkKEZ6hqF2gqVtzf38GQpkwgM%2BElpdYI8%2BRfrDeiR4CUJNNjLJibChNliQk5qjg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=eca3570e9aa3c15b2fad65c40a87f0fb',
  'area=12_904_50647_52660&body=%7B%22liveId%22%3A%223082907%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=df981994ce5e3b3e25b2078723a335bc&st=1608169866799&sv=100&uts=0f31TVRjBSsx5eg1K1LluXT7F3nt5fC6DLomzY/8ucR6/783kTOoEi6oEIsfodwXynL2MYEJR6jJw/uoQ7M/7scUx1GhJJEYAydJ%2B8OseTojIb40aQyeT8%2BOsRiFHfnUIfn%2BkUdaXZ8sk32cdOSDt4ifkKEZ6hqF2gqVtzf38GQpkwgM%2BElpdYI8%2BRfrDeiR4CUJNNjLJibChNliQk5qjg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=eca3570e9aa3c15b2fad65c40a87f0fb',
  'area=12_904_50647_52660&body=%7B%22liveId%22%3A%223072567%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=d7bc92fd2cfbd478e6289084e9429219&st=1608170014772&sv=121&uts=0f31TVRjBSsx5eg1K1LluXT7F3nt5fC6DLomzY/8ucR6/783kTOoEi6oEIsfodwXynL2MYEJR6jJw/uoQ7M/7scUx1GhJJEYAydJ%2B8OseTojIb40aQyeT8%2BOsRiFHfnUIfn%2BkUdaXZ8sk32cdOSDt4ifkKEZ6hqF2gqVtzf38GQpkwgM%2BElpdYI8%2BRfrDeiR4CUJNNjLJibChNliQk5qjg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=eca3570e9aa3c15b2fad65c40a87f0fb',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223124013%22%7D&build=167490&client=apple&clientVersion=9.3.2&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=202&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=0f7bb48eb322c7b3ccead03a34861f63&st=1608635723826&sv=102&uts=0f31TVRjBStw8knSFDdsVgNuIE%2B1ORt5bpU5yqZg420unzZABVgEbtHwjTThdykZlSWLPd%2Bokqu%2BqFOQULVcfnV5Aq1iVW62/biMegQS12T3NDFPQmQuYExjRypdG/fenMpu05xQJiA%2BbT9WJc5uOr9Qsm05W%2BWqu2OaNGJ5BR4h%2B5OoHbI1ROGfoesKTMWTejU3jn5i%2BTPEFT6DZNIVvw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=96fe93266f1662fa0e7d281ddcf33714',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223133464%22%7D&build=167490&client=apple&clientVersion=9.3.2&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=202&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=9ca17ab10cbff3331e2601deb9719aae&st=1608635742155&sv=102&uts=0f31TVRjBStw8knSFDdsVgNuIE%2B1ORt5bpU5yqZg420unzZABVgEbtHwjTThdykZlSWLPd%2Bokqu%2BqFOQULVcfnV5Aq1iVW62/biMegQS12T3NDFPQmQuYExjRypdG/fenMpu05xQJiA%2BbT9WJc5uOr9Qsm05W%2BWqu2OaNGJ5BR4h%2B5OoHbI1ROGfoesKTMWTejU3jn5i%2BTPEFT6DZNIVvw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=96fe93266f1662fa0e7d281ddcf33714',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223105440%22%7D&build=167490&client=apple&clientVersion=9.3.2&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=202&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=419d6be760fb7a8ee250ad2b0b4e27c9&st=1608635758028&sv=100&uts=0f31TVRjBStw8knSFDdsVgNuIE%2B1ORt5bpU5yqZg420unzZABVgEbtHwjTThdykZlSWLPd%2Bokqu%2BqFOQULVcfnV5Aq1iVW62/biMegQS12T3NDFPQmQuYExjRypdG/fenMpu05xQJiA%2BbT9WJc5uOr9Qsm05W%2BWqu2OaNGJ5BR4h%2B5OoHbI1ROGfoesKTMWTejU3jn5i%2BTPEFT6DZNIVvw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=96fe93266f1662fa0e7d281ddcf33714',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223113039%22%7D&build=167490&client=apple&clientVersion=9.3.2&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=202&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=e7bc3bfa61c6318ee78c162c897f1e70&st=1608635780159&sv=112&uts=0f31TVRjBStw8knSFDdsVgNuIE%2B1ORt5bpU5yqZg420unzZABVgEbtHwjTThdykZlSWLPd%2Bokqu%2BqFOQULVcfnV5Aq1iVW62/biMegQS12T3NDFPQmQuYExjRypdG/fenMpu05xQJiA%2BbT9WJc5uOr9Qsm05W%2BWqu2OaNGJ5BR4h%2B5OoHbI1ROGfoesKTMWTejU3jn5i%2BTPEFT6DZNIVvw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=96fe93266f1662fa0e7d281ddcf33714',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223146420%22%7D&build=167490&client=apple&clientVersion=9.3.2&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=203&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=ce50428d267490327fece49dfda09e9d&st=1608689238309&sv=111&uts=0f31TVRjBStw8knSFDdsVgNuIE%2B1ORt5bpU5yqZg420SF6V7W%2BQX5NYyJSMzUmiSzdHLQcqAPFuecGCbrq2s7xrq3a52E/QSMA8JHaEHOx98Ckmc2Nm60%2BOgrqCy3jF1vlTEx7N6PyOzI9l1CeGSkp8OXBKTt7ULB/GKFhsvpEG%2BaaIJPpfiphzLggUrrQqUqYSEPhStlSu6klhX6bL5rw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=96fe93266f1662fa0e7d281ddcf33714',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223146335%22%7D&build=167490&client=apple&clientVersion=9.3.2&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=203&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=c5344b70932efb172a17aa23ce0d7ee8&st=1608689255895&sv=102&uts=0f31TVRjBStw8knSFDdsVgNuIE%2B1ORt5bpU5yqZg420SF6V7W%2BQX5NYyJSMzUmiSzdHLQcqAPFuecGCbrq2s7xrq3a52E/QSMA8JHaEHOx98Ckmc2Nm60%2BOgrqCy3jF1vlTEx7N6PyOzI9l1CeGSkp8OXBKTt7ULB/GKFhsvpEG%2BaaIJPpfiphzLggUrrQqUqYSEPhStlSu6klhX6bL5rw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=96fe93266f1662fa0e7d281ddcf33714',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223157819%22%7D&build=167490&client=apple&clientVersion=9.3.2&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=205&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=43ef299779faa9249274bb996efa9de6&st=1608771549921&sv=120&uts=0f31TVRjBSuR162JGH82%2B%2BqT6cf5BYU3kSFdI2bHAVQGsT4XBCdHHvNPT%2ByTs434X%2BHvW8H4eW79biqYiaK083xFYlgVd5yNOK54O5Usl0SEqdpfrPxA03LcyCxk4BwD7oybDeKNj1MDdV8Tkb8TIiMQ35FCn01JyLxtS04QsDktj5Xasd/63/qa2iRpVeNvsoNtzuUCKdsvxEj64bLHog%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=96fe93266f1662fa0e7d281ddcf33714',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223157726%22%7D&build=167490&client=apple&clientVersion=9.3.2&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=205&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=7fe5b6db994b40fa89761fee42205cb8&st=1608771638313&sv=102&uts=0f31TVRjBSuR162JGH82%2B%2BqT6cf5BYU3kSFdI2bHAVQGsT4XBCdHHvNPT%2ByTs434X%2BHvW8H4eW79biqYiaK083xFYlgVd5yNOK54O5Usl0SEqdpfrPxA03LcyCxk4BwD7oybDeKNj1MDdV8Tkb8TIiMQ35FCn01JyLxtS04QsDktj5Xasd/63/qa2iRpVeNvsoNtzuUCKdsvxEj64bLHog%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=96fe93266f1662fa0e7d281ddcf33714',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223157597%22%7D&build=167490&client=apple&clientVersion=9.3.2&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=205&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=30246e46e2ae0e11de5dd1a9938886a7&st=1608771667528&sv=100&uts=0f31TVRjBSuR162JGH82%2B%2BqT6cf5BYU3kSFdI2bHAVQGsT4XBCdHHvNPT%2ByTs434X%2BHvW8H4eW79biqYiaK083xFYlgVd5yNOK54O5Usl0SEqdpfrPxA03LcyCxk4BwD7oybDeKNj1MDdV8Tkb8TIiMQ35FCn01JyLxtS04QsDktj5Xasd/63/qa2iRpVeNvsoNtzuUCKdsvxEj64bLHog%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=96fe93266f1662fa0e7d281ddcf33714',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223157820%22%7D&build=167490&client=apple&clientVersion=9.3.2&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=205&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=91745ba3316eeaf6839ec5f35eafc2af&st=1608771692676&sv=121&uts=0f31TVRjBSuR162JGH82%2B%2BqT6cf5BYU3kSFdI2bHAVQGsT4XBCdHHvNPT%2ByTs434X%2BHvW8H4eW79biqYiaK083xFYlgVd5yNOK54O5Usl0SEqdpfrPxA03LcyCxk4BwD7oybDeKNj1MDdV8Tkb8TIiMQ35FCn01JyLxtS04QsDktj5Xasd/63/qa2iRpVeNvsoNtzuUCKdsvxEj64bLHog%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=96fe93266f1662fa0e7d281ddcf33714',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223157734%22%7D&build=167490&client=apple&clientVersion=9.3.2&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=205&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=b8053e67a1a1d4a34be405262d2fed6a&st=1608771706828&sv=122&uts=0f31TVRjBSuR162JGH82%2B%2BqT6cf5BYU3kSFdI2bHAVQGsT4XBCdHHvNPT%2ByTs434X%2BHvW8H4eW79biqYiaK083xFYlgVd5yNOK54O5Usl0SEqdpfrPxA03LcyCxk4BwD7oybDeKNj1MDdV8Tkb8TIiMQ35FCn01JyLxtS04QsDktj5Xasd/63/qa2iRpVeNvsoNtzuUCKdsvxEj64bLHog%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=96fe93266f1662fa0e7d281ddcf33714',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223146266%22%7D&build=167490&client=apple&clientVersion=9.3.2&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=205&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=d754afe908f2e66711747b3d9d31332e&st=1608786942816&sv=121&uts=0f31TVRjBSuR162JGH82%2B%2BqT6cf5BYU3kSFdI2bHAVSxsPFRTwr1f7QHkpmQZqCQi4xshoclDffnsGsdTx/57aHmI3RpDSgxk8K/0wH4t7w8MSJOrISjzyX76RwqRkjP55JaSHxxzMZClfYHeMktSgcSKfG7NPeKLrClS/KVEu9buiYHtREsqiU7F5yS1xSE5pbfQEmT6pulbI87zNmDtw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=96fe93266f1662fa0e7d281ddcf33714'
]
!(async () => {
  for(let i=0;i<bodyList.length;++i){
    await getRedRain(bodyList[i]);
    if($.activityId) {
      await writeFile();
      break
    }
  }
  if($.activityId) {
    await notify.sendNotify(`${new Date($.startTime).getHours()}点${$.name}更新成功！`,$.activityId);
  }else{
    await notify.sendNotify(`${new Date($.startTime).getHours()}点${$.name}无法更新，请检查！`,'');
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })


async function writeFile() {
  if(!$.activityId) return
  const info = {
    activityId:$.activityId,
    startTime:$.startTime,
    endTime:$.endTime
  }
  await fs.writeFileSync('jd_live_redRain3.json', JSON.stringify(info));
  console.log(`文件写入成功`);
  // 覆盖文件，获取token
  const accessKey = process.env.QINIU_AK;
  const secretKey = process.env.QINIU_SK;
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const localFile = "jd_live_redRain3.json";
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: "nuist:" + localFile
  });
  const uploadToken = putPolicy.uploadToken(mac);

  // 上传文件
  const formUploader = new qiniu.form_up.FormUploader({
    scope: "nuist:" + localFile
  });
  const putExtra = new qiniu.form_up.PutExtra();
  const key = 'jd_live_redRain3.json';
  formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
                                                                       respBody, respInfo) {
    if (respErr) {
      throw respErr;
    }
    if (respInfo.statusCode == 200) {
      console.log(respBody);
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
    }
  });

  // 刷新缓存
  let urlsToRefresh = [
    'http://ql4kk90rw.hb-bkt.clouddn.com/jd_live_redRain3.json'
  ];
  let cdnManager = new qiniu.cdn.CdnManager(mac);

  cdnManager.refreshUrls(urlsToRefresh, function(err, respBody, respInfo) {
    if (err) {
      throw err;
    }
    if (respInfo.statusCode === 200) {
      console.log('刷新成功！')
    }
  });

}

function getRedRain(body) {
  return new Promise(resolve => {
    $.post(taskPostUrl('liveActivityV842',body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data && data.data.iconArea) {
              let act = data.data.iconArea.filter(vo=>vo['type']==="platform_red_packege_rain")[0]
              if (act) {
                let url = act.data.activityUrl
                $.activityId = url.substr(url.indexOf("id=") + 3)
                $.startTime = act.startTime
                $.endTime = act.endTime
                console.log($.activityId)
                console.log(`下一场红包雨开始时间：${new Date(act.startTime)}`)
                console.log(`下一场红包雨结束时间：${new Date(act.endTime)}`)
              }
            } else {
              console.log(`暂无红包雨`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}


function taskPostUrl(function_id, body = {}) {
  return {
    url: `https://api.m.jd.com/client.action?functionId=${function_id}`,
    body: body,
    headers: {
      'Host': 'api.m.jd.com',
      'content-type': 'application/x-www-form-urlencoded',
      'accept': '*/*',
      'user-agent': 'JD4iPhone/167408 (iPhone; iOS 14.2; Scale/3.00)',
      'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
      //"Cookie": cookie,
    }
  }
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
