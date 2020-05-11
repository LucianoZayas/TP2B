const mongoClient = require('mongodb').MongoClient;
const uriDatabase = "mongodb+srv://admin:tenisfull21@cluster0-13mm5.mongodb.net/test?retryWrites=true&w=majority";
const chalk = require('chalk');

const client = new mongoClient(uriDatabase, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertarInventor(collectionInventors, inventor){
  console.log("insertando inventor...");
  collectionInventors.insertOne(inventor);
}

async function DeletearInventor(collectionInventors, inventor){
    console.log("Deleteando inventor...");
    collectionInventors.deleteOne({last: inventor.last});
}

async function actualizandoInventor(collectionInventors, inventor){
  console.log("actualizando inventor...")
  collectionInventors.updateOne({last: inventor.last},
      { $set: {
          first: inventor.first,
          last: inventor.last,
          year: inventor.year
          }
      }
  )
}
   
async function crud(){
    let inventores = await client.connect()
      .then (result => {
        console.log(chalk.green("Conexión Exitosa"));
        return collectionInventors = result.db('sample_betp2').collection('inventors');
        let inventors = collectionInventors.find().toArray();
      })
      .catch(error  => {        
        console.log(chalk.red(error));
      });

    let inventor = {
      first :"Luciano",
      last : "Zayas",
      year : 1956
    }

    await insertarInventor(collectionInventors, inventor)
      .then(() => {
        console.log(chalk.green(`Se insertó el inventor: ${inventor.last}`));      
      })
      .catch((error) => {
          console.log(chalk.red(`Error al intentar insertar el inventor: ${error}`));
      }); 

    inventor = {
      first :"Luciano",
      last : "Zayas",
      year : 1994
    }
    
    await actualizandoInventor(collectionInventors, inventor).then(() => {
        console.log(chalk.green(`Se actualizó el inventor: ${inventor.last}`));      
      })
      .catch((error) => {
          console.log(chalk.red(`Error al intentar actualizar el inventor: ${error}`));
      });
    
    await DeletearInventor(collectionInventors, inventor).then(() => {
        console.log(chalk.green(`Se elimino el inventor: ${inventor.last}`));      
      })
      .catch((error) => {
          console.log(chalk.red(`Error al intentar eliminar el inventor: ${error}`));
      });
    console.log("hasta luego!");
    
}
        
crud();