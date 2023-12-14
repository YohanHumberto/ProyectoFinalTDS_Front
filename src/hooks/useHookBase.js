import useHandleStatusCode from '../helpers/HandleStatusCode';

function useHookBase({ Warning, Danger, Info, Success }, service, setData, setLoading) {

    const { OnHandleStatusCode } = useHandleStatusCode();

    const cargarDatos = async (searchString = '') => {
        try {
            setLoading(true);
            var res = await service.obtener(searchString);
            OnHandleStatusCode(res);
            setData(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al cargar los datos, intentelo mas tarde.");
        }
    }

    const obtenerPorId = async () => {
        try {
            var res = await service.obtenerPorId();
            OnHandleStatusCode(res);
            return res.data;
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al cargar los datos, intentelo mas tarde.");
        }
    }

    const agregar = async (entity) => {
        try {
            var res = await service.agregar(entity);
            OnHandleStatusCode(res);
            cargarDatos();
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al intentar procesar su solicitud.");
        }
    }

    const editar = async (entity) => {
        try {
            var res = await service.editar(entity);
            OnHandleStatusCode(res);
            Success("El recurso ha sido editado correctamente.");
            cargarDatos();
        } catch (error) {
            Danger("Se ha presentado un error inesperado al intentar procesar su solicitud.");
        }
    }

    const eliminar = async (id) => {
        try {
            var res = await service.eliminar(id);
            OnHandleStatusCode(res);
            Success("El recurso ha sido eliminado correctamente.");
            cargarDatos();
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al intentar procesar su solicitud.");
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