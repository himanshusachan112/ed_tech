export default function Percentagecompleted(totalsections,completedsections){
    try{
        let total=totalsections.length;
    let observation=completedsections.length;
    const ansser=(observation*100)/total;
    return ansser;
    }
    catch(err){
        return 0;
    }
}