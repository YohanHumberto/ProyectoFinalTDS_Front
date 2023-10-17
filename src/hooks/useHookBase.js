import useHandleStatusCode from '../helpers/HandleStatusCode';

function useHookBase({ Warning, Danger, Info, Success }, service, setData) {

    const { OnHandleStatusCode } = useHandleStatusCode();

    const cargarDatos = async () => {
        try {
            var res = await service.obtener();
            OnHandleStatusCode(res);
            setData(res.data);
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al cargar los datos, intentelo mas tarde.");
        }
    }

    const obtenerPorId = async () => {
        try {
            var res = await service.obtenerPorId();
            OnHandleStatusCode(res);
            return res.datas;
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al cargar los datos, intentelo mas tarde.");
        }
    }

    const agregar = async (entity) => {
        try {
            var res = await service.agregar(entity);
            OnHandleStatusCode(res);
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al intentar procesar su solicitud.");
        } finally {
            cargarDatos();
        }
    }

    const editar = async (entity) => {
        try {
            var res = await service.editar(entity);
            OnHandleStatusCode(res);
            console.log(res);
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al intentar procesar su solicitud.");
        } finally {
            Success("El recurso ha sido editado correctamente.");
            cargarDatos();
        }
    }

    const eliminar = async (id) => {
        try {
            var res = await service.eliminar(id);
            OnHandleStatusCode(res);
            console.log(res);
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al intentar procesar su solicitud.");
        } finally {
            Success("El recurso ha sido eliminado correctamente.");
            cargarDatos();
        }
    }

    return (
        {
            cargarDatos,
            obtenerPorId,
            agregar,
            editar,
            eliminar
        }
    )
}

export default useHookBase;