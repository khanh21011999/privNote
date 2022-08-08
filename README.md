# privNote : The most reliable note-talking app

This note will listen and keep all your secret, and keep it until you don't want it keep your secret for you anymore
Cancel changes


# To-do list

##  Basic

- [x] Add Note
- [x] Edit Note
- [x] Remove Note
- [ ] Add dark mode
- [ ] HightLight Text
- [ ] Change font weight of hightlight
- [ ] Everyday quote
- [ ] Setting Screen
- [ ] Preview Web View
- [ ] Bookmark Note
- [ ] Security
- [ ] Audio 
- [ ] Hand writing font
- [ ] Can draw
- [ ] NoteTYPE ( horizontal)
- [ ] Seperate note by days
- [ ] Add diary ( lots of note )
- [ ] Redesgin UI ( important )
- [ ] Add image,video,audio
## Advanced 
- [x] Add cloud storage
- [ ] Add payment for no ad, special note feature
- [ ] Animation
- [ ] Add "Series" ( a numerous notes of a story )
- [ ] Change app to completely MERNN (Mongo,Express,RN, Node) 
 
## ISSUES ❌
Change the line 
``` javascript
global.performance = {
     now: global._chronoNow,
 };
```

to 
``` javascript
if (global.performance == null) {
        global.performance = {
          now: global._chronoNow,
        };
 }
```
in ```node_modules/react-native-reanimated/src/reanimated2/core.ts```  to prevent ```performance..now()``` error

Link fix firebase https://github.com/invertase/react-native-firebase/issues/1878

Link fix react-native-reanimated https://github.com/gorhom/react-native-bottom-sheet/issues/771
