const $ = new Env('更新京东红包雨');
const fs = require('fs');
const qiniu = require('qiniu')

let bodyList = [
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223047856%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=a40cd2f47ecf7b4ad42697af86879380&st=1607929766907&sv=120&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjY5o9rpnbqdxuWWjY1Kj0hprZ3Y/h4YnVAKPaM%2BG7COEsUoR7Ipf%2Bo064gHc0b7RTt8mSsfXj89o2TXV2acOL4C3PjlJcAT3y8llwzZ95L05bP83LwVCKDw5VKxH%2BVOGmWbz/boo8SKzlVwvh9pqeQ9krJkAVK8QgWXYep5imvA3Q%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223049023%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=4d49b3b6c3f4e1bf86f18efd98d1160c&st=1607929818682&sv=102&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjY5o9rpnbqdxuWWjY1Kj0hprZ3Y/h4YnVAKPaM%2BG7COEsUoR7Ipf%2Bo064gHc0b7RTt8mSsfXj89o2TXV2acOL4C3PjlJcAT3y8llwzZ95L05bP83LwVCKDw5VKxH%2BVOGmWbz/boo8SKzlVwvh9pqeQ9krJkAVK8QgWXYep5imvA3Q%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223051528%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=955a4bd9d5f7e5c0474fddb2d6c197ed&st=1607929827898&sv=122&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjY5o9rpnbqdxuWWjY1Kj0hprZ3Y/h4YnVAKPaM%2BG7COEsUoR7Ipf%2Bo064gHc0b7RTt8mSsfXj89o2TXV2acOL4C3PjlJcAT3y8llwzZ95L05bP83LwVCKDw5VKxH%2BVOGmWbz/boo8SKzlVwvh9pqeQ9krJkAVK8QgWXYep5imvA3Q%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223007651%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=0bcef8684ad7988492913658c45c7867&st=1607929844865&sv=102&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjY5o9rpnbqdxuWWjY1Kj0hprZ3Y/h4YnVAKPaM%2BG7COEsUoR7Ipf%2Bo064gHc0b7RTt8mSsfXj89o2TXV2acOL4C3PjlJcAT3y8llwzZ95L05bP83LwVCKDw5VKxH%2BVOGmWbz/boo8SKzlVwvh9pqeQ9krJkAVK8QgWXYep5imvA3Q%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223002441%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=779a2952f8a346bea2a72fe7992c4c64&st=1607929855810&sv=111&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjY5o9rpnbqdxuWWjY1Kj0hprZ3Y/h4YnVAKPaM%2BG7COEsUoR7Ipf%2Bo064gHc0b7RTt8mSsfXj89o2TXV2acOL4C3PjlJcAT3y8llwzZ95L05bP83LwVCKDw5VKxH%2BVOGmWbz/boo8SKzlVwvh9pqeQ9krJkAVK8QgWXYep5imvA3Q%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223055159%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=5ecb27b1833d02e9045a80af284f82aa&st=1607929867230&sv=110&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjY5o9rpnbqdxuWWjY1Kj0hprZ3Y/h4YnVAKPaM%2BG7COEsUoR7Ipf%2Bo064gHc0b7RTt8mSsfXj89o2TXV2acOL4C3PjlJcAT3y8llwzZ95L05bP83LwVCKDw5VKxH%2BVOGmWbz/boo8SKzlVwvh9pqeQ9krJkAVK8QgWXYep5imvA3Q%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%222975956%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=e09830b41de8246598e8fdf8db8d2a01&st=1607935055224&sv=121&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=unknown',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223051641%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=429c41ac0bec7469b870fac0548c73e3&st=1607935141581&sv=112&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223045906%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=261db70306c179b610c185e649506b12&st=1607935148681&sv=122&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223031224%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=1a9435f45e0b592de0844d9653c4c216&st=1607935154925&sv=110&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223055418%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=745d29d30f96edc093b5f6130b198770&st=1607935160913&sv=111&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223015538%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=fc9a3dfb0dddf5b453dc5f92d9eca9e7&st=1607935169617&sv=112&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223025553%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=4514b155192860c6ab485938ea693a0b&st=1607935171530&sv=110&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%222919169%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=91e01882faa75f4de5ec7a88d9860484&st=1607935175397&sv=102&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223051597%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=56ccc9a44d114bc28888f1396b7b7c3f&st=1607935179851&sv=112&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223035196%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=503847a56700f716b08cbc6dd9493b84&st=1607935183746&sv=101&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223052715%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=77784ad4577b8151ed8ea2121956b2c0&st=1607935187527&sv=110&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223048435%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=d94c2cf3a3cfcc9dbfd09db30338f188&st=1607935390972&sv=122&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%222996313%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=bd8eb0fa3317b0e1811f1185bb0785db&st=1607935397943&sv=121&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223054281%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=c2e1607ec33069e73838c7f3cfdd77c7&st=1607935405120&sv=112&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%222987710%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=47796ef7b6bde196af5cc43aaa30e860&st=1607935410301&sv=102&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223051435%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=7d8a6ac4a8c94565746261d74c444eb1&st=1607935414514&sv=100&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
  'area=12_904_908_57903&body=%7B%22liveId%22%3A%223018188%22%7D&build=167454&client=apple&clientVersion=9.3.0&d_brand=apple&d_model=iPhone10%2C2&eid=eidIF3CF0112RTIyQTVGQTEtRDVCQy00Qg%3D%3D6HAJa9%2B/4Vedgo62xKQRoAb47%2Bpyu1EQs/6971aUvk0BQAsZLyQAYeid%2BPgbJ9BQoY1RFtkLCLP5OMqU&isBackground=N&joycious=200&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=apple&rfs=0000&scope=01&screen=1242%2A2208&sign=d426e75ee34d6ef11d0fc099582e2c6c&st=1607935420459&sv=101&uts=0f31TVRjBStSN/KN45aFsqdm3cWx37OzS1DDtk92JjaZ19XVw85ldxPeN8fT4sEjiEHY7t1Zf95l1QU11si0hh7FDBItpsUbHiIpWEE%2B2Iy8yb6ULr5zetC%2BbGsVCImFR432XpZbOgnkb0Alv6gNTFOQP7bDji5Q2Q4e/aT5%2BtrGa8o2OJBwVY3RHAu%2BEQHNJXEJj2uS4EDrCD%2BbnQmYgg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D',
]
!(async () => {
  for(let i=0;i<bodyList.length;++i){
    await getRedRain(bodyList[i]);
    if($.activityId) {
      await writeFile();
      break
    }
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
  await fs.writeFileSync('jd_live_redRain.json', JSON.stringify(info));
  console.log(`文件写入成功`);
  // 覆盖文件，获取token
  const accessKey = process.env.QINIU_AK;
  const secretKey = process.env.QINIU_SK;
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const localFile = "jd_live_redRain.json";
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: "nuist:" + localFile
  });
  const uploadToken = putPolicy.uploadToken(mac);

  // 上传文件
  const formUploader = new qiniu.form_up.FormUploader({
    scope: "nuist:" + localFile
  });
  const putExtra = new qiniu.form_up.PutExtra();
  const key = 'jd_live_redRain.json';
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
    'http://ql4kk90rw.hb-bkt.clouddn.com/jd_live_redRain.json'
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
    $.post(taskPostUrl('liveActivityV842',body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data && data.data.iconArea) {
              let act = data.data.iconArea.filter(vo=>vo['type']==="platform_red_packege_rain")[0]
              let url = act.data.activityUrl
              $.activityId = url.substr(url.indexOf("id=") + 3)
              $.startTime = act.startTime
              $.endTime = act.endTime
              console.log(`下一场红包雨开始时间：${new Date(act.startTime)}`)
              console.log(`下一场红包雨结束时间：${new Date(act.endTime)}`)
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
